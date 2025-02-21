from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)  # Get username from related User model
    #username = serializers.StringRelatedField(read_only=True)
    profile_image = serializers.SerializerMethodField()

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if isinstance(obj, Profile):  # Ensure obj is a Profile instance
            if obj.profile_image:
                return request.build_absolute_uri(obj.profile_image.url)  # Returns full URL
        return None

    class Meta:
        model = Profile
        fields = ['username', 'uID', 'first_name', 'last_name', 'profile_image']
        read_only_fields = ['uID', 'username', 'first_name', 'last_name']  # uID, username is read-only
