from django.contrib import admin

# Register your models here.
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "uID", "class_standing")
    search_fields = ("user__username", "user__first_name", "user__last_name")
