import uuid

from django.contrib.auth import get_user_model
from djoser.serializers import (
    UserSerializer,
    UserCreatePasswordRetypeSerializer,
)
from rest_framework import serializers

from users.models import ProfileImage

User = get_user_model()


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = (
            "id",
            "width",
            "height",
            "url",
        )


class CustomUserSerializer(UserSerializer):
    profile_picture = serializers.ImageField(write_only=True, required=False)
    profile_pictures = ProfileImageSerializer(
        many=True,
        read_only=True,
    )

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "company_name",
            "bio",
            "profile_picture",
            "profile_pictures",
            "date_of_birth",
            "is_company",
            "is_creator",
            "followed_users",
            "followed_podcasts",
            "followed_blogs",
            "date_joined",
            "last_visit",
        )
        read_only_fields = (
            "email",
            "date_joined",
            "last_visit",
            "followed_users",
            "followed_podcasts",
            "followed_blogs",
        )

    def create(self, validated_data):
        profile_picture = validated_data.pop("profile_picture", None)
        user = super().create(**validated_data)
        user_id = user.id

        if profile_picture:
            try:
                image_set = ProfileImage.generate_imageset(
                    profile_picture,
                    image_id=user_id,
                )
                profile_pictures = []
                for image in image_set:
                    instance = ProfileImage.objects.create(**image)
                    profile_pictures.append(instance)
            except Exception as e:
                raise serializers.ValidationError({"profile_picture": str(e)})

        user.profile_pictures.set(profile_pictures)
        return user

    def update(self, instance, validated_data):
        profile_picture = validated_data.pop("profile_picture", None)
        # Convert string representation of id field to UUID
        for attr, value in validated_data.items():
            if (
                isinstance(value, str)
                and hasattr(instance, attr)
                and isinstance(getattr(instance, attr), uuid.UUID)
            ):
                value = uuid.UUID(value)  # Convert string to UUID if necessary
            setattr(instance, attr, value)

        if profile_picture:
            try:
                image_set = ProfileImage.generate_imageset(
                    profile_picture,
                    image_id=instance.id,
                )
                profile_pictures = []
                for image in image_set:
                    instance = ProfileImage.objects.create(**image)
                    profile_pictures.append(instance)
            except Exception as e:
                raise serializers.ValidationError({"profile_picture": str(e)})

        instance.profile_pictures.set(profile_pictures)

        instance.save()
        return instance


class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = ("id", "email", "is_creator", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }
