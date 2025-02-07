from django.urls import path
from .views import PinListCreateView, PinDetailView

urlpatterns = [
    path('', PinListCreateView.as_view(), name='pin-list-create'),  # GET & POST
    path('<int:pk>/', PinDetailView.as_view(), name='pin-detail'),  # GET, PUT, DELETE
]
