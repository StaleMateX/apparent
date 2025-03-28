from django.contrib import admin

# Register your models here.
from .models import Post, Comment


class CommentInline(admin.TabularInline):  # or admin.StackedInline
    model = Comment
    extra = 1  # Number of empty forms to display
    fields = ('user', 'content', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "created_at")
    search_fields = ("title", "user__username", "user__first_name", "user__last_name")
    list_filter = ("created_at", "user__first_name", "user__last_name")
    inlines = [CommentInline]

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "content", "created_at")
    search_fields = ("content", "user__username", "user__first_name", "user__last_name")
    list_filter = ("created_at", "user__first_name", "user__last_name")
