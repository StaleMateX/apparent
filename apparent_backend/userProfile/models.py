from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Hobby(models.Model):

    class Hobbies(models.TextChoices):
        NOT_SPECIFIED = "NS", "Ask me to find out"
        OPEN = "OP", "I'm open to anything"
        FAMILY_LIFE = "FL", "Family Life: Parks, kid's places, museums, pools"
        SOCIALS = "SO", "Socials: Dinners, brunches, parties, board games"
        CHILL_INDOORS = "CI", "Chill Indoors: Reading, Netflix and chill, games, movies"
        ACTIVE_INDOORS = "AI", "Active Indoors: Pilates, weight-lifting, dancing, martial arts"
        CHILL_OUTDOORS = "CO", "Chill Outdoors: Strolling, site-seeing, gardening, yoga"
        ACTIVE_OUTDOORS = "AO", "Active Outdoors: Hiking, camping, biking, mud-runners"


    hobby_type = models.CharField(max_length=2,
                                  choices=Hobbies.choices,
                                  default=Hobbies.NOT_SPECIFIED)

    def __str__(self):
        return self.get_hobby_type_display()

def user_directory_path(instance, filename):
    """Uploads image to a user's profile folder inside MEDIA_ROOT/profile_pictures/"""
    return f'profile_pictures/{instance.user.username}/{filename}'

class Profile(models.Model):
    """ The constants are from: https://docs.djangoproject.com/en/5.1/ref/models/fields/ """

    class YearInSchool(models.TextChoices):
        NOT_SPECIFIED = "NS", "NOT SPECIFIED"
        FRESHMAN = "FR", "Freshman"
        SOPHMORE = "SO", "Sophomore"
        JUNIOR = "JR", "Junior"
        SENIOR = "SR", "Senior"
        GRADUATE = "GR", "Graduate"
        DOCTORATE = "DR", "Doctorate"

    class BackgroundCheck(models.TextChoices):
        CLEARED = 'CL', "Cleared"
        IN_PROGRESS = 'IP', "In Progress"
        NONE = 'NO', "None"

    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the User model
    profile_image = models.ImageField(
        upload_to=user_directory_path,  # Custom upload function
        default="profile_pictures/jolly_rancher.jpg",  # Default profile picture
        blank=True
    ) # Provided by https://www.youtube.com/watch?v=xSUm6iMtREA at 46 minutes.
    background_check = models.CharField(max_length=2,
                                        choices=BackgroundCheck.choices,
                                        default=BackgroundCheck.NONE)
    phone_number = models.CharField(max_length=12, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    institution = models.CharField(max_length=100, blank=True)
    about_me = models.TextField(max_length=175, blank=True) # max length is 150 for conciseness
    hobbies = models.ManyToManyField(Hobby, related_name="participants") # TODO: read from JSON hobbies list, adding user to each hobby group at a time.
    class_standing = models.CharField(max_length=2,
                                      choices=YearInSchool.choices,
                                      default=YearInSchool.NOT_SPECIFIED,
                                      )
    friends = models.ManyToManyField("self", symmetrical=True, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} - Profile"
