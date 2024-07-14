from datetime import timedelta

from pydub import AudioSegment
from rest_framework import serializers

from podcasts.models import (
    Podcast,
    Episode,
    CoverImage,
    Tag,
    Category,
    Language,
    AudioFile,
)


class CoverImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverImage
        fields = (
            "id",
            "width",
            "height",
            "url",
        )


class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = (
            "id",
            "bitrate",
            "url",
        )


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ("code",)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "title",
            "created_at",
            "updated_at",
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            "id",
            "title",
            "created_at",
            "updated_at",
        )


# TODO: Change inputs to ListFields for all inputs when it's time
# to implement frontend requests
class PodcastSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(write_only=True, required=False)
    languages_input = serializers.MultipleChoiceField(
        choices=Language.LANGUAGE_CHOICES,
        write_only=True,
        required=False,
    )
    categories_input = serializers.CharField(
        write_only=True,
        required=False,
        help_text="Enter categories as comma-separated values, e.g., 'Tech, Science'",
    )
    tags_input = serializers.CharField(
        write_only=True,
        required=False,
        help_text="Enter tags as comma-separated values, e.g., 'podcast, technology'",
    )
    cover_images = CoverImageSerializer(
        many=True,
        read_only=True,
    )
    languages = LanguageSerializer(
        many=True,
        read_only=True,
    )
    categories = CategorySerializer(
        many=True,
        read_only=True,
    )
    tags = TagSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Podcast
        fields = (
            "id",
            "title",
            "description",
            "publish_date",
            "author",
            "publisher",
            "cover_image",
            "cover_images",
            "languages",
            "rss_feed_url",
            "website_url",
            "explicit_content",
            "average_rating",
            "total_reviews",
            "reviews",
            "categories",
            "tags",
            "episodes",
            "languages_input",
            "categories_input",
            "tags_input",
        )
        read_only_fields = (
            "id",
            "publish_date",
            "episodes",
            "cover_images",
            "languages",
            "average_rating",
            "total_reviews",
            "reviews",
            "categories",
            "tags",
        )

    def create(self, validated_data):
        cover_image = validated_data.pop("cover_image", None)
        languages_data = validated_data.pop("languages_input", [])
        categories_data = validated_data.pop("categories_input", [])
        tags_data = validated_data.pop("tags_input", [])
        podcast = Podcast.objects.create(**validated_data)
        podcast_id = podcast.id

        # Handle cover_image upload and resizing
        if cover_image:
            try:
                image_set = CoverImage.generate_imageset(
                    cover_image,
                    image_id=podcast_id,
                )
                cover_images = []
                for image in image_set:
                    instance = CoverImage.objects.create(**image)
                    cover_images.append(instance)
            except Exception as e:
                raise serializers.ValidationError({"cover_image": str(e)})

        # Handle languages (create or retrieve existing)
        languages_instances = Language.objects.filter(
            code__in=languages_data,
        )

        # Handle categories (create or retrieve existing)
        categories_instances = Category.get_or_create_objects_by_field(
            "title", categories_data
        )
        # Handle tags (create or retrieve existing)
        tags_instances = Tag.get_or_create_objects_by_field("title", tags_data)

        podcast.cover_images.set(cover_images)
        podcast.languages.set(languages_instances)
        podcast.categories.set(categories_instances)
        podcast.tags.set(tags_instances)

        return podcast


class EpisodeSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(write_only=True, required=False)
    audio_file_input = serializers.FileField(write_only=True, required=False)
    categories_input = serializers.CharField(
        write_only=True,
        required=False,
        help_text="Enter categories as comma-separated values, e.g., 'Tech, Science'",
    )
    tags_input = serializers.CharField(
        write_only=True,
        required=False,
        help_text="Enter tags as comma-separated values, e.g., 'podcast, technology'",
    )
    cover_images = CoverImageSerializer(
        many=True,
        read_only=True,
    )
    audio_file = AudioFileSerializer(
        many=True,
        read_only=True,
    )
    categories = CategorySerializer(
        many=True,
        read_only=True,
    )
    tags = TagSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Episode
        fields = (
            "id",
            "title",
            "description",
            "publish_date",
            "cover_image",
            "cover_images",
            "audio_file_input",
            "audio_file",
            "duration",
            "episode_number",
            "season_number",
            "explicit_content",
            "is_external",
            "external_url",
            "average_rating",
            "total_reviews",
            "reviews",
            "podcast",
            "categories",
            "tags",
            "categories_input",
            "tags_input",
        )
        read_only_fields = (
            "id",
            "publish_date",
            "cover_images",
            "duration",
            "average_rating",
            "total_reviews",
            "reviews",
        )

    def create(self, validated_data):
        cover_image = validated_data.pop("cover_image", None)
        audio_file = validated_data.pop("audio_file_input", None)
        categories_data = validated_data.pop("categories_input", [])
        tags_data = validated_data.pop("tags_input", [])
        episode = Episode.objects.create(**validated_data)
        episode_id = episode.id

        # Handle cover_image upload and resizing
        if cover_image:
            try:
                image_set = CoverImage.generate_imageset(
                    image_path=cover_image,
                    image_id=episode_id,
                )
                cover_images = []
                for image in image_set:
                    instance = CoverImage.objects.create(**image)
                    cover_images.append(instance)
            except Exception as e:
                raise serializers.ValidationError({"cover_image": str(e)})

        # Handle audio_file upload with different bitrates and duration calculation
        if audio_file:
            # Use the file-like object directly with pydub
            audio_file.seek(0)
            if audio_file.name.endswith(".mp3"):
                audio_segment = AudioSegment.from_file(
                    audio_file,
                    format="mp3",
                )
                episode.duration = timedelta(seconds=len(audio_segment) / 1000)

            try:
                audio_set = AudioFile.generate_audioset(
                    audio_file=audio_file,  # Pass the file-like object directly
                    audio_id=episode_id,
                )
                audio_files = []
                for audio in audio_set:
                    instance = AudioFile.objects.create(**audio)
                    audio_files.append(instance)
            except Exception as e:
                raise serializers.ValidationError({"audio_file": str(e)})

        # Handle categories (create or retrieve existing)
        categories_instances = Category.get_or_create_objects_by_field(
            "title", categories_data
        )
        # Handle tags (create or retrieve existing)
        tags_instances = Tag.get_or_create_objects_by_field("title", tags_data)

        episode.cover_images.set(cover_images)
        episode.audio_file.set(audio_files)
        episode.categories.set(categories_instances)
        episode.tags.set(tags_instances)

        return episode
