from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Allow admins to see all profiles
            return Profile.objects.all()
        return Profile.objects.filter(user=user)

    def get_object(self):
        # Ensure that the user updates only their own profile
        return get_object_or_404(Profile, user=self.request.user)

    def perform_create(self, serializer):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)  # Get existing or create new
        serializer.instance = profile  # Set the serializer instance to the found or created profile
        print(serializer.validated_data)
        serializer.save()

    def perform_update(self, serializer):
        #print(serializer.validated_data)
        #print(self.request.FILES)
        profile = self.get_object()  # Fetch the user's profile
        if self.request.FILES.get('profile_image'):
            profile.profile_image = self.request.FILES['profile_image']
        # Ensure that the user is always assigned to their profile
        serializer.save()  # Prevent uID change
        print(profile.profile_image)
