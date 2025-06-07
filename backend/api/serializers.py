# api/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'firstname', 'lastname', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],  # use email as username
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['firstname'],
            last_name=validated_data['lastname']
        )
        return user 


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'gender', 'birthday', 'address','maritalstatus','job','city','country']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['firstname', 'lastname', 'email', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance