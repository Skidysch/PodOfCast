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


# TODO: split serializers by methods
class CustomUserSerializer(UserSerializer):
    profile_image = serializers.ImageField(write_only=True, required=False)
    profile_images = ProfileImageSerializer(
        many=True,
        read_only=True,
    )

    class Meta(UserSerializer.Meta):
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
            "is_onboarded",
            "is_company",
            "is_creator",
            "followed_users",
            "followed_podcasts",
            "followed_blogs",
            "date_joined",
            "last_visit",
            "get_full_name",
        )
        read_only_fields = (
            "email",
            "date_joined",
            "last_visit",
            "followed_users",
            "followed_podcasts",
            "followed_blogs",
            "get_full_name",
            "is_onboarded",
            "is_creator",
        )

    def create(self, validated_data):
        profile_image = validated_data.pop("profile_image", None)
        user = super().create(**validated_data)

        if profile_image:
            try:
                ProfileImage.generate_imageset(
                    profile_image,
                    user_id=user.id,
                )
            except Exception as e:
                raise serializers.ValidationError({"profile_image": str(e)})
        return user

    def update(self, instance, validated_data):
        profile_image = validated_data.pop("profile_image", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if profile_image:
            try:
                ProfileImage.generate_imageset(
                    profile_image,
                    user_id=instance.id,
                )
            except Exception as e:
                raise serializers.ValidationError({"profile_image error": str(e)})

        instance.save()
        return instance


class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = ("id", "email", "is_creator", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }


class OnboardingSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "is_company",
            "company_name",
            "bio",
            "profile_image",
            "date_of_birth",
        ]

    def update(self, instance, validated_data):
        profile_image = validated_data.pop("profile_image", None)
        try:
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
        except Exception as e:
            raise serializers.ValidationError({"Update error": str(e)})

        if profile_image:
            try:
                ProfileImage.generate_imageset(
                    profile_image,
                    user_id=instance.id,
                )
            except Exception as e:
                raise serializers.ValidationError({"profile_image error": str(e)})

        instance.is_onboarded = True
        instance.save()

        return instance
