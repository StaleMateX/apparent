from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    """ The constants are from: https://docs.djangoproject.com/en/5.1/ref/models/fields/ """

    class YearInSchool(models.TextChoices):
        NOT_SPECIFIED = "", "NOT SPECIFIED"
        FRESHMAN = "FR", "Freshman"
        SOPHMORE = "SO", "Sophmore"
        JUNIOR = "JR", "Junior"
        SENIOR = "SR", "Senior"
        GRADUATE = "GR", "Graduate"
        DOCTORATE = "DR", "Doctorate"

    class BackgroundCheck(models.TextChoices):
        CLEARED = 'CL', "Cleared"
        IN_PROGRESS = 'IP', "In Progress"
        NONE = 'NO', "None"

    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the User model
    uID = models.CharField(max_length=8, unique=True)  # Ensure unique IDs like "u1234567"
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    background_check = models.CharField(max_length=2,
                                        choices=BackgroundCheck.choices,
                                        default=BackgroundCheck.NONE)
    phone_number = models.CharField(max_length=10, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    institution = models.CharField(max_length=100, blank=True)
    about_me = models.TextField(max_length=175, blank=True) # max length is 150 for conciseness
    hobbies = models.TextField(blank=True) #Todo: turn this to textchoice?
    class_standing = models.CharField(max_length=2,
                                      choices=YearInSchool.choices,
                                      blank=True,
                                      default='',
                                      )
    num_children = models.PositiveIntegerField(default=0)
    child_ages = models.CharField(max_length=255, blank=True, default="Undisclosed")

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - Profile'

@receiver(post_save, sender=User)
def create_or_update(sender, instance, created, **kwargs):
    if created:
        last_profile = Profile.objects.order_by('-uID').first()
        if last_profile and last_profile.uID.startswith('u'):
            last_uID = int(last_profile.uID[1:])
            new_uID = f"u{last_uID + 1:07d}"
        else:
            new_uID = "u0000001"
        profile = Profile.objects.create(user=instance, uID=new_uID)
    else:
        instance.userprofile.save()
