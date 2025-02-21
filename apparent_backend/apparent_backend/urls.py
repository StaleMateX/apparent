"""
URL configuration for apparent_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from forum.views import PostViewSet, CommentViewSet  # Import CommentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from userProfile.views import ProfileViewSet

router = DefaultRouter()
#router.register(r'forum', PostViewSet)
router.register(r'forum', PostViewSet, basename='forum')  # Posts API
router.register(r'comments', CommentViewSet, basename='comments')  # Comments API
router.register(r'userProfile', ProfileViewSet, basename='userProfile')

urlpatterns = [
    # Admin routes
    path('admin/', admin.site.urls),

    # API routes
    path('api/', include(router.urls)),  # Includes routes for PostViewSet and CommentViewSet
    path('api/profile/', include('userProfile.urls')),

    # User management routes
    path('register/', include('register.urls')),  # Custom registration API
    path('login/', include('login.urls')),  # Custom login API

    # JWT authentication routes
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Map Pins routes
    path('api/pins/', include('pins.urls')),

    # # User Profiles routes
    # path('api/', include('userProfile.urls')),
]

# Serve media files during development
if settings.DEBUG:
      urlpatterns += [
          path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
          #static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
      ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
