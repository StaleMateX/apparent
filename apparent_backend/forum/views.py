from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.exceptions import PermissionDenied
from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

class IsOwnerOrFriend(BasePermission):
    message = "Profiles can be viewed by friends only."
    print("Inside the custom permission")
    # This will override the global permissions for users.
    def has_permission(self, request, view):
        print(f"user is authenticated ? {request.user.is_authenticated}")
        return request.user.is_authenticated

    # This will apply object-level permissions.
    def has_object_permission(self, request, view, obj):
        # Allow access if the user is the owner or a friend of the owner
        print(f"object user equals request user? {obj.user == request.user}")
        return obj.user == request.user
    """ or request.user in obj.user.friends.all() """

class PostViewSet(ModelViewSet):
    queryset = Post.objects.prefetch_related('comments')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        if post.user != request.user:
            raise PermissionDenied("You are not allowed to delete this post.")
        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=["get"], permission_classes=[IsOwnerOrFriend], url_path="profile-feed")
    def profile_feed(self, request):
        print("Inside profile_feed")
        print("Request user:", request.user)

        posts = Post.objects.filter(user=request.user).prefetch_related('comments')
        print("Posts:", posts)

        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        if not post_id:
            raise serializers.ValidationError({'post': 'This field is required.'})
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != request.user:
            raise PermissionDenied("You are not allowed to delete this comment.")
        return super().destroy(request, *args, **kwargs)
