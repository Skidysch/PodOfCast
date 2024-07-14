from io import BytesIO
import uuid

import boto3
from django.conf import settings
from django.core.validators import RegexValidator
from django.db import models
from django.utils.text import slugify
from polymorphic.models import PolymorphicModel
from pydub import AudioSegment
from PIL import Image

from podcasts.mixins import GetListOfInstancesByFieldMixin


class CoverImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    height = models.PositiveIntegerField()
    width = models.PositiveIntegerField()
    url = models.URLField()

    @staticmethod
    def generate_imageset(image_path, image_id):
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
        try:
            original_image = Image.open(image_path)
            for size in sizes:
                resized_image = original_image.resize(
                    (size["width"], size["height"]),
                )
                image_buffer = BytesIO()
                resized_image.save(image_buffer, format=original_image.format)
                image_buffer.seek(0)
                image_key = (
                    f"podcast_service/{image_id}_{size["width"]}x{size["height"]}.{original_image.format.lower()}"
                )
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
                    }
                )
            return image_set
        except Exception as e:
            print(f"Error generating image set: {e}")
            return None

    def __str__(self):
        return f"Cover image with id: {self.id}"


class AudioFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bitrate = models.PositiveIntegerField()
    url = models.URLField()

    @staticmethod
    def generate_audioset(audio_file, audio_id):
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        bitrates = ["320k", "192k", "128k"]
        audio_set = []
        try:
            # Read the original audio file
            audio_file.seek(0)
            original_audio = AudioSegment.from_file(audio_file, format="mp3")

            for bitrate in bitrates:
                # Create a new audio buffer for each bitrate
                audio_buffer = BytesIO()
                original_audio.export(audio_buffer, format="mp3", bitrate=bitrate,)
                audio_buffer.seek(0)

                audio_key = f"podcast_service/{audio_id}_{bitrate}.mp3"
                s3_client.upload_fileobj(
                    audio_buffer, settings.AWS_STORAGE_BUCKET_NAME, audio_key,
                    ExtraArgs={
                        "ContentType": "audio/mpeg"
                    },
                )

                audio_url = f"{settings.AWS_S3_URL}{audio_key}"
                audio_set.append(
                    {
                        "bitrate": int(bitrate[:-1]),
                        "url": audio_url,
                    }
                )
            return audio_set
        except Exception as e:
            print(f"Error generating audio set: {e}")
            return None

    def __str__(self):
        return f"Audio file with id: {self.id}"


# TODO: change code to choice field
class Language(models.Model, GetListOfInstancesByFieldMixin):
    LANGUAGE_CODE_PATTERN = r"^[a-z]{2}-[A-Z]{2}$"
    language_validator = RegexValidator(
        regex=LANGUAGE_CODE_PATTERN,
        message='Language code must be in the format "xx-XX".',
    )

    ENGLISH = 'en-US'
    SPANISH = 'es-ES'
    FRENCH = 'fr-FR'
    GERMAN = 'de-DE'
    CHINESE = 'zh-CN'
    RUSSIAN = "ru-RU"

    LANGUAGE_CHOICES = [
        (ENGLISH, 'English (United States)'),
        (SPANISH, 'Spanish (Spain)'),
        (FRENCH, 'French (France)'),
        (GERMAN, 'German (Germany)'),
        (CHINESE, 'Chinese (China)'),
        (RUSSIAN, 'Russian (Russia)'),
    ]

    code = models.CharField(
        max_length=5,
        choices=LANGUAGE_CHOICES,
        validators=[language_validator],
        unique=True,
    )

    def __str__(self):
        return self.get_code_display()


class Podcast(models.Model):
    USER_GENERATED = "user_generated"
    SPOTIFY = "spotify"
    OTHER = "other"
    SOURCE_CHOICES = [
        (USER_GENERATED, "User Generated"),
        (SPOTIFY, "Spotify"),
        (OTHER, "Other"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    title = models.CharField(
        max_length=255,
    )
    description = models.TextField(max_length=1000)
    author = models.UUIDField(blank=True, null=True)
    publisher = models.CharField(max_length=255, blank=True, null=True)
    source = models.CharField(
        max_length=15,
        choices=SOURCE_CHOICES,
        default=USER_GENERATED,
    )
    publish_date = models.DateTimeField(auto_now_add=True)
    languages = models.ManyToManyField(
        "podcasts.Language",
        related_name="podcasts",
        blank=True,
    )
    cover_images = models.ManyToManyField(
        "podcasts.CoverImage",
        related_name="podcast",
        blank=True,
    )
    rss_feed_url = models.URLField(
        blank=True,
        null=True,
    )
    website_url = models.URLField(
        blank=True,
        null=True,
    )
    explicit_content = models.BooleanField(default=False)
    average_rating = models.FloatField(default=0.0)
    total_reviews = models.PositiveIntegerField(default=0)
    categories = models.ManyToManyField(
        "podcasts.Category",
        related_name="podcasts",
        blank=True,
    )
    tags = models.ManyToManyField(
        "podcasts.Tag",
        related_name="podcasts",
        blank=True,
    )

    def save(self, *args, **kwargs):
        if self.source == self.USER_GENERATED and not self.author:
            raise ValueError("User-generated podcasts must have an author.")
        if self.source != self.USER_GENERATED and not self.publisher:
            raise ValueError("External podcasts must have a publisher.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Episode(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    title = models.CharField(
        max_length=255,
    )
    description = models.TextField(
        max_length=1000,
    )
    publish_date = models.DateTimeField(auto_now_add=True)
    cover_images = models.ManyToManyField(
        "podcasts.CoverImage",
        related_name="episode",
        blank=True,
    )
    audio_file = models.ManyToManyField(
        "podcasts.AudioFile",
        related_name="episode",
        blank=True,
    )
    duration = models.DurationField(
        blank=True,
        null=True,
    )
    is_external = models.BooleanField(default=False)
    external_url = models.URLField(blank=True, null=True)
    episode_number = models.IntegerField()
    season_number = models.IntegerField()
    explicit_content = models.BooleanField(default=False)
    average_rating = models.FloatField(default=0.0)
    total_reviews = models.PositiveIntegerField(default=0)
    podcast = models.ForeignKey(
        "podcasts.Podcast",
        related_name="episodes",
        on_delete=models.CASCADE,
    )
    categories = models.ManyToManyField(
        "podcasts.Category",
        related_name="episodes",
    )
    tags = models.ManyToManyField(
        "podcasts.Tag",
        related_name="episodes",
    )

    def __str__(self):
        return self.title


class Category(models.Model, GetListOfInstancesByFieldMixin):
    title = models.CharField(
        max_length=100,
    )
    slug = models.SlugField(unique=True, blank=True,)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def save(self, *args, **kwargs):
        try:
            self.title = self.title.lower()
            self.slug = slugify(self.title.lower())
            if not Category.objects.filter(slug=self.slug).exists():
                super().save(*args, **kwargs)
            else:
                raise Exception("Category with same title already exists")
        except Exception as e:
            print(f"Can't save category: {e}")

    def __str__(self):
        return self.title.capitalize()

    class Meta:
        verbose_name_plural = "Categories"


class Tag(models.Model, GetListOfInstancesByFieldMixin):
    title = models.CharField(
        max_length=100,
    )
    slug = models.SlugField(unique=True, blank=True,)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def save(self, *args, **kwargs):
        try:
            self.title = self.title.lower()
            self.slug = slugify(self.title.lower())
            if not Tag.objects.filter(slug=self.slug).exists():
                super().save(*args, **kwargs)
            else:
                raise Exception("Tag with same title already exists")
        except Exception as e:
            print(f"Can't save tag: {e}")

    def __str__(self):
        return self.title.capitalize()


class Review(PolymorphicModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    user_id = models.UUIDField()
    rating = models.IntegerField()
    comment = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by user {self.user_id}"


class PodcastReview(Review):
    podcast = models.ForeignKey(
        "podcasts.Podcast",
        related_name="reviews",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"Review by user {self.user_id} on podcast {self.podcast.title}"


class EpisodeReview(Review):
    episode = models.ForeignKey(
        "podcasts.Episode",
        related_name="reviews",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"Review by user {self.user_id} on episode {self.episode.title}"