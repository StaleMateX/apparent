from django.contrib import admin

# Register your models here.
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=("title", "user", "created_at")
    search_fields = ("title", "user__username")
    list_filter = ("created_at",)
