from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from django.db.models import Q
from .models import Hobby, Profile, FriendRequest, User
from .serializers import ProfileSerializer, HobbySerializer, FriendRequestSerializer
from django.shortcuts import get_object_or_404
from django.http import Http404

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [MultiPartParser, FormParser]
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

class HobbyViewSet(ModelViewSet):
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer
    permission_classes = [IsAuthenticated]

class IsSenderOrReceiver(BasePermission):
    def has_object_permission(self, request, view, obj):
        """ Ensures only the sender or receiver of a friend request can modify it."""
        # obj is a FriendRequest instance
        return obj.from_user == request.user or obj.to_user == request.user

class IsReceiverOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.to_user == request.user and obj.from_user != request.user

class IsSenderOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.from_user == request.user and obj.to_user != request.user

class FriendRequestSet(ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated, IsSenderOrReceiver]

    def get_permissions(self):
        """ Ensures only the sender of the friend request can delete the request directly. """
        if self.action == "destroy":
            return [IsAuthenticated(), IsSenderOnly()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset.filter(Q(to_user = user) | Q(from_user = user))

    def get_object(self):
        queryset = self.get_queryset()
        user_request = get_object_or_404(queryset, pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, user_request)
        return user_request

    @action(detail=True, method=["post"], permission_classes=[IsAuthenticated, IsSenderOnly])
    def send_request(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer = serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=HTTP_201_CREATED)


    @action(detail=True, methods=["put"], permission_classes=[IsAuthenticated, IsReceiverOnly])
    def update_status(self, request, pk=None):
        friend_request = self.get_object()
        serializer = self.serializer_class(friend_request, data=request.data, partial=True)
        serializer = serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=HTTP_200_OK)
