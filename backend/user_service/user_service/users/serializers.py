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
    profile_image = serializers.ImageField(write_only=True, required=False)
    profile_images = ProfileImageSerializer(
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
            "profile_image",
            "profile_images",
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
        profile_image = validated_data.pop("profile_image", None)
        user = super().create(**validated_data)
        user_id = user.id

        if profile_image:
            try:
                image_set = ProfileImage.generate_imageset(
                    profile_image,
                    image_id=user_id,
                )
                profile_images = []
                for image in image_set:
                    instance = ProfileImage.objects.create(**image)
                    profile_images.append(instance)
            except Exception as e:
                raise serializers.ValidationError({"profile_image": str(e)})

        user.profile_images.set(profile_images)
        return user

    def update(self, instance, validated_data):
        profile_image = validated_data.pop("profile_image", None)
        # Convert string representation of id field to UUID
        for attr, value in validated_data.items():
            if (
                isinstance(value, str)
                and hasattr(instance, attr)
                and isinstance(getattr(instance, attr), uuid.UUID)
            ):
                value = uuid.UUID(value)  # Convert string to UUID if necessary
            setattr(instance, attr, value)

        if profile_image:
            try:
                image_set = ProfileImage.generate_imageset(
                    profile_image,
                    image_id=instance.id,
                )
                profile_images = []
                for image in image_set:
                    image_obj = ProfileImage.objects.create(**image)
                    profile_images.append(image_obj)
                instance.profile_images.set(profile_images)
            except Exception as e:
                raise serializers.ValidationError({"profile_image": str(e)})

        instance.save()
        return instance


class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = ("id", "email", "is_creator", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }
