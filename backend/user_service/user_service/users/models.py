from io import BytesIO
import uuid

import boto3
from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from PIL import Image


class ProfileImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    height = models.PositiveIntegerField()
    width = models.PositiveIntegerField()
    url = models.URLField()
    user = models.ForeignKey("User", related_name="profile_images", on_delete=models.CASCADE, blank=True,)

    @staticmethod
    def generate_imageset(image_path, user_id):
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        sizes = [
            {"height": 640, "width": 640},
            {"height": 300, "width": 300},
            {"height": 64, "width": 64},
        ]
        image_set = []
        user = User.objects.get(pk=user_id)
        try:
            original_image = Image.open(image_path)
            for size in sizes:
                resized_image = original_image.resize(
                    (size["width"], size["height"]),
                )
                image_buffer = BytesIO()
                resized_image.save(image_buffer, format=original_image.format)
                image_buffer.seek(0)
                image_base = (
                    f"user_service/{user_id}_{size["width"]}x{size["height"]}"
                )
                image_key = f'{image_base}.{original_image.format.lower()}'
                s3_client.upload_fileobj(
                    image_buffer, settings.AWS_STORAGE_BUCKET_NAME, image_key,
                    ExtraArgs={
                        "ContentType": Image.MIME[original_image.format]
                    },
                )
                image_url = f"{settings.AWS_S3_URL}{image_key}"
                
                image_set.append(
                    {
                        "height": size["height"],
                        "width": size["width"],
                        "url": image_url,
                        "base": image_base,
                    }
                )
            for image in image_set:
                ProfileImage.objects.update_or_create(url__contains=image["base"], defaults={"url": image["url"]}, create_defaults={"url": image["url"], "height": image["height"], "width": image["width"], "user": user,})
        except Exception as e:
            print(f"Error generating image set: {e}")
            return None

    def __str__(self):
        return f"Profile image with id: {self.id}"


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_onboarded = models.BooleanField(default=False)
    followed_users = models.ManyToManyField(
        "self",
        related_name="followers",
        symmetrical=False,
        blank=True,
    )  # List of podcast UUIDs
    followed_podcasts = models.JSONField(
        default=list,
        blank=True,
    )  # List of podcast UUIDs
    followed_blogs = models.JSONField(
        default=list,
        blank=True,
    )  # List of blog UUIDs
    is_creator = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    date_of_birth = models.DateField(
        blank=True,
        null=True,
    )
    last_visit = models.DateTimeField(
        blank=True,
        null=True,
    )

    objects = UserManager()

    def get_full_name(self):
        return (
            f"{self.company_name.capitalize()}"
            if self.is_company
            else f"{self.first_name} {self.last_name}"
        )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
