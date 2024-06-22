from django.contrib.auth import get_user_model
from djoser.serializers import (
    UserSerializer,
    UserCreatePasswordRetypeSerializer,
)

User = get_user_model()


class CustomUserSerializer(UserSerializer):
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
            "date_of_birth",
            "is_company",
            "is_creator",
            "followed_users",
            "followed_podcasts",
            "followed_blogs",
            "date_joined",
            "last_visit",
        )


class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = ("id", "email", "is_creator", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }
