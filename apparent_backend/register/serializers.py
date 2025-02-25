from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    #Todo: refactor the password and email into models.py
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()  # Ensures valid email format

    class Meta:
        model = User
        fields = ["user", "email", "first_name", "last_name"]
    #Todo refactor the below methods into models.py
    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        # Setting the password this way hashes it!
        user.set_password(validated_data['password'])
        user.save()
        return user
