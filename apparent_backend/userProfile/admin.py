from django.contrib import admin

# Register your models here.
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user",
    "city","state","institution",
    "about_me",
    "display_hobbies","class_standing",
    "display_friends")
    search_fields = ("user__username", "user__first_name", "user__last_name", "hobbies__hobby_type",
    "class_standing","city", "state",
    "institution",
    "phone_number")

    def display_hobbies(self, obj):
        return ", ".join([hobby.hobby_type for hobby in obj.hobbies.all()])
    display_hobbies.short_description = "Hobbies"

    def display_friends(self, obj):
        return ", ".join([friend.user.get_full_name() or friend.user.username for friend in obj.friends.all()])
    display_friends.short_description = "Friends"
