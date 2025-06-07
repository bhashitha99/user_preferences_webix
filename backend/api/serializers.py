# api/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

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
