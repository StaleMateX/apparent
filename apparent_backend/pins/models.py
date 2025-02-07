from django.db import models
from django.contrib.auth.models import User  # Import the User model

class Pin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pins")  # Link to the user
    title = models.CharField(max_length=200)
    about = models.TextField(blank=True, null=True)
    specific_location = models.TextField(blank=True, null=True)
    available_time = models.TextField(blank=True, null=True)
    contact_info = models.TextField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

