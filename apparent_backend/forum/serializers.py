from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth.models import User

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Shows the username instead of ID
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())  # Allow `post` to be passed during creation

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Shows the username instead of ID
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'content', 'created_at', 'comments']
