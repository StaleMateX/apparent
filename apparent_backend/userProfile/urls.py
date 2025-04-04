from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, FriendRequestViewSet

router = DefaultRouter()
router.register(r"profile", ProfileViewSet)
router.register(r"friend-requests", FriendRequestViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
