from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

router = DefaultRouter()
router.register("", ProfileViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('update/', ProfileViewSet.as_view({'patch': 'partial_update'})),
]
