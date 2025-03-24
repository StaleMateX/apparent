from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Profile
from .serializers import ProfileSerializer
from .models import Hobby
from .serializers import HobbySerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Allow admins to see all profiles
            return self.queryset
        return self.queryset.filter(user=user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        self.check_object_permissions(self.request, obj)
        return obj

    # def get_object(self):
    #     obj, created = Profile.objects.get_or_create(user=self.request.user)
    #     return obj

    # def perform_create(self, serializer):
    #     profile, _ = Profile.objects.get_or_create(user=self.request.user)  # Get existing or create new
    #     serializer.instance = profile  # Set the serializer instance to the found or created profile
    #     print(serializer.validated_data)
    #     serializer.save(user=self.request.user)

    # def perform_update(self, serializer):
    #     profile = self.get_object()  # Fetch the user's profile
    #     if self.request.FILES.get('profile_image'):
    #         profile.profile_image = self.request.FILES['profile_image']
    #         profile.save()
    #     # Ensure that the user is always assigned to their profile
    #     serializer.save()

    # @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    # def my_profile(self, request):
    #     profile, created = Profile.objects.get_or_create(user=request.user)
    #     serializer = self.get_serializer(profile, context={"request": request})
    #     return Response(serializer.data)

    # @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    # def edit_my_info(self, request):
    #     profile = self.get_object()
    #     serializer = ProfileSerializer(profile, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({"message": "Profile Updated", "profile": serializer.data}, status=200)
    #     return Response(serializer.errors, status=400)

    # def get_profile_image(self, obj):
    #         """Return absolute URL for profile image if it exists."""
    #         request = self.context.get("request")
    #         if obj.profile_image:
    #             return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url
    #         return None

class HobbyViewSet(ModelViewSet):
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer
    permission_classes = [IsAuthenticated]
