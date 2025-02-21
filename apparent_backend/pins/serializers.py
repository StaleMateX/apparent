from rest_framework import serializers
from .models import Pin

class PinSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Pin
        fields = '__all__'
