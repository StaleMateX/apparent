from rest_framework import serializers
from .models import Profile, Hobby

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ["hobby_type"]

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    profile_image = serializers.ImageField(required=False)
    hobbies = HobbySerializer(many=True)
    friends = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "username", "first_name", "last_name", "profile_image",
            "background_check", "phone_number", "city", "state",
            "institution", "about_me", "hobbies", "class_standing", "friends"
        ]
        read_only_fields = ["username", "first_name", "last_name"]

    def get_friends(self, obj):
        return [ friend.user.get_full_name() or
                friend.user.username for friend in
                obj.friends.all()]
