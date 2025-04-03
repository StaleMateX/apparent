from rest_framework import serializers
from django.db.models import Q
from .models import Profile, Hobby, FriendRequest, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class HobbySerializer(serializers.ModelSerializer):
    hobby_type_display = serializers.CharField(source="get_hobby_type_display", read_only=True)
    # This will call the get_hobby_options by convention of naming the function with get_var_name
    hobby_options = serializers.SerializerMethodField()

    class Meta:
        model = Hobby
        fields = ["hobby_type", "hobby_type_display", "hobby_options"]

    def get_hobby_options(self, obj):
        return [{"hobby_type": choices.value, "hobby_type_display": choices.label} for choices in Hobby.Hobbies]

class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    profile_image = serializers.ImageField(required=False)
    hobbies_ro = HobbySerializer(many=True, source="hobbies", read_only=True)

    hobbies = serializers.ListField(child = serializers.ChoiceField(choices=Hobby.Hobbies.choices),
                                    write_only=True,
                                    required=False)
    friends = serializers.SerializerMethodField()
    class_standing_display = serializers.CharField(source="get_class_standing_display", read_only=True) # We can still update the class standing using the actual model field.
    background_check_display = serializers.CharField(source="get_background_check_display", read_only=True)

    class Meta:
        model = Profile
        fields = [
        "id",
        "username", "first_name", "last_name", "profile_image",
        "background_check_display", "phone_number", "city", "state",
        "institution", "about_me", "hobbies", "hobbies_ro",
        "class_standing", "class_standing_display", "friends"
        ]


    # Overriding the update function for the hobbies field specifically.
    def update(self, instance, validated_data):
        hobby_types = validated_data.pop("hobbies", None)

        if isinstance(hobby_types, list):
            hobby_objs = Hobby.objects.filter(hobby_type__in=hobby_types)
            print(f"Hobby objects {hobby_objs}")
            instance.hobbies.set(hobby_objs)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    def get_friends(self, obj):
        friends_profiles = obj.friends.all()
        users = [friend.user for friend in friends_profiles]
        return UserSerializer(users, many=True).data

    def get_requests(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return []

        user = request.user
        queryset = queryset = FriendRequest.objects.for_user(user)
        return FriendRequestSerializer(queryset, many=True).data


class FriendRequestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)
    to_user_id = serializers.PrimaryKeyRelatedField(queryset = User.objects.all(),
                                                    source = 'to_user',
                                                    write_only = True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'to_user_id', 'to_user', 'from_user', 'status', 'status_display', 'created_at']
        read_only_fields = ['from_user', 'to_user', 'created_at']

    def create(self, validated_data):
        from_user = self.context["request"].user
        to_user = validated_data.get('to_user')

        if to_user == from_user:
            raise serializers.ValidationError("Can't friend yourself.")

        if FriendRequest.objects.filter(to_user=to_user, from_user=from_user).exists():
            raise serializers.ValidationError("Friend request already exists.")

        return FriendRequest.objects.create(to_user=to_user, from_user=from_user)


    def update(self, instance, validated_data):
        """
        Updates a friend request status to Accepted, Ignored, Blocked, or Declined.

        Declined deletes the friend request.

        Args:
            validated_data: The data containing the new status for the friend request.

        Returns:
            The validated instance of the updated friend request.
        """
        updated_status = validated_data.get('status')

        if updated_status not in FriendRequest.RequestOptions.values:
            raise serializers.ValidationError(f"Invalid request status value {updated_status}")

        if updated_status == FriendRequest.RequestOptions.DECLINED:
            instance.delete()
            return instance
        elif updated_status == FriendRequest.RequestOptions.ACCEPTED:
            from_profile = Profile.objects.get(user=instance.from_user)
            to_profile = Profile.objects.get(user=instance.to_user)
            to_profile.friends.add(from_profile)
            instance.delete()
            return instance
        else:
            instance.status = updated_status
            instance.save()

        return instance
