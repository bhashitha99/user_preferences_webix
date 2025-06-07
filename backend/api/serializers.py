# api/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile,UserNotificationSetting, UserPrivacySetting

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
    firstname = serializers.CharField(source='user.first_name', read_only=True)
    lastname = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    class Meta:
        model = UserProfile
        fields = ['phone', 'gender', 'birthday', 'address','maritalstatus',
                  'job','city','country','firstname', 'lastname', 'email']

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
    
class ChangePasswordSerializer(serializers.Serializer):
    oldPassword = serializers.CharField(required=True)
    newPassword = serializers.CharField(required=True)
    confirmPassword = serializers.CharField(required=True)

    def validate(self, data):
        if data['newPassword'] != data['confirmPassword']:
            raise serializers.ValidationError("New password and confirm password do not match.")
        return data
    
class UserNotificationSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNotificationSetting
        fields = '__all__'
        read_only_fields = ['user']

class UserPrivacySettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPrivacySetting
        fields = '__all__'
        read_only_fields = ['user']