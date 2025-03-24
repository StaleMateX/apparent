from rest_framework import serializers
from .models import Profile, Hobby

class HobbySerializer(serializers.ModelSerializer):
    hobby_type_display = serializers.CharField(source="get_hobby_type_display", read_only=True)
    # This will call the get_hobby_options by convention of starting the function with get_var_name
    hobby_options = serializers.SerializerMethodField()

    class Meta:
        model = Hobby
        fields = ["hobby_type", "hobby_type_display", "hobby_options"]

    def get_hobby_options(self, obj):
        return [{"hobby_type": choices.value, "hobby_type_display": choices.label} for choices in Hobby.Hobbies]

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    profile_image = serializers.ImageField(required=False)
    hobbies = HobbySerializer(many=True)
    friends = serializers.SerializerMethodField()
    class_standing_display = serializers.CharField(source="get_class_standing_display", read_only=True) # We can still update the class standing using the actual model field.
    background_check_display = serializers.CharField(source="get_background_check_display", read_only=True)

    class Meta:
        model = Profile
        fields = [
            "username", "first_name", "last_name", "profile_image",
            "background_check_display", "phone_number", "city", "state",
            "institution", "about_me", "hobbies", "class_standing","class_standing_display", "friends"
        ]
        read_only_fields = ["username", "first_name", "last_name"]

    def get_friends(self, obj):
        return [ friend.user.get_full_name() or
                friend.user.username for friend in
                obj.friends.all()]
