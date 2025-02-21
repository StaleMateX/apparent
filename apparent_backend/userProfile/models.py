from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the User model
    uID = models.CharField(max_length=8, unique=True)  # Ensure unique IDs like "u1234567"
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    #background_check = models.CharField(max_length=11)
    #phone_number = models.CharField(max_length=10)
    #about_me = models.TextField(blank=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - Profile'

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        print(f"Creating profile for user {instance.first_name} {instance.last_name}")  # Debugging
        last_profile = Profile.objects.order_by('-uID').first()
        print(f"Last profile uID: {last_profile.uID if last_profile else 'None'}")  # Debugging
        if last_profile and last_profile.uID.startswith('u'):
            last_uID = int(last_profile.uID[1:])
            new_uID = f"u{last_uID + 1:07d}"
        else:
            new_uID = "u0000001"
        profile = Profile.objects.create(user=instance, uID=new_uID)
        print(f"New uID created: {new_uID}")  # Debugging
        print(f"Profile created for user: {instance.username}, uID: {profile.uID}")  # Debugging
