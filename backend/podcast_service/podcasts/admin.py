from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from polymorphic.admin import (
    PolymorphicParentModelAdmin,
    PolymorphicChildModelAdmin,
    PolymorphicChildModelFilter,
)

from podcasts.models import (
    Podcast,
    Episode,
    Category,
    Tag,
    Review,
    PodcastReview,
    EpisodeReview,
    Language,
    CoverImage,
    AudioFile,
)


class PodcastAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            _("General info"),
            {
                "fields": (
                    "title",
                    "description",
                )
            },
        ),
        (
            _("Metadata"),
            {
                "fields": (
                    "languages",
                    "cover_images",
                    "explicit_content",
                    "publish_date",
                )
            },
        ),
        (
            _("Feedback"),
            {
                "fields": (
                    "average_rating",
                    "total_reviews",
                    "reviews",
                )
            },
        ),
        (
            _("URLs"),
            {
                "fields": (
                    "rss_feed_url",
                    "website_url",
                )
            },
        ),
        (
            _("Relations"),
            {
                "fields": (
                    "author",
                    "publisher",
                    "source",
                    "categories",
                    "tags",
                )
            },
        ),
    )
    list_display = (
        "title",
        "publish_date",
        "explicit_content",
        "source",
    )
    search_fields = (
        "title",
        "description",
        "publisher",
        "author",
    )
    list_filter = (
        "languages",
        "explicit_content",
        "source",
        "categories",
        "tags",
    )
    filter_horizontal = (
        "categories",
        "tags",
    )
    readonly_fields = ("publish_date",)


class EpisodeAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            _("General info"),
            {
                "fields": (
                    "title",
                    "description",
                )
            },
        ),
        (
            _("Metadata"),
            {
                "fields": (
                    "cover_images",
                    "audio_file",
                    "explicit_content",
                    "season_number",
                    "episode_number",
                )
            },
        ),
        (
            _("Source"),
            {
                "fields": (
                    "is_external",
                    "external_url",
                )
            },
        ),
        (
            _("Feedback"),
            {
                "fields": (
                    "average_rating",
                    "total_reviews",
                    "reviews",
                )
            },
        ),
        (
            _("Relations"),
            {
                "fields": (
                    "podcast",
                    "categories",
                    "tags",
                )
            },
        ),
    )
    list_display = (
        "title",
        "publish_date",
        "explicit_content",
    )
    search_fields = (
        "title",
        "description",
    )
    list_filter = (
        "explicit_content",
        "categories",
        "tags",
    )
    filter_horizontal = (
        "categories",
        "tags",
    )


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "created_at",
        "updated_at",
    )
    search_fields = (
        "title",
        "slug",
    )
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    list_filter = (
        "created_at",
        "updated_at",
    )
    ordering = ("title",)


class TagAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "created_at",
        "updated_at",
    )
    search_fields = (
        "title",
        "slug",
    )
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    list_filter = (
        "created_at",
        "updated_at",
    )
    ordering = ("title",)


class ReviewChildAdmin(PolymorphicChildModelAdmin):
    base_model = Review


class PodcastReviewAdmin(ReviewChildAdmin):
    base_model = PodcastReview


class EpisodeReviewAdmin(ReviewChildAdmin):
    base_model = EpisodeReview


class ReviewParentAdmin(PolymorphicParentModelAdmin):
    base_model = Review
    child_models = (PodcastReview, EpisodeReview)
    list_filter = (PolymorphicChildModelFilter,)


class CoverImageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "width",
        "height",
        "url",
    )


class AudioFileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "bitrate",
        "url",
    )


admin.site.register(Podcast, PodcastAdmin)
admin.site.register(Episode, EpisodeAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Review, ReviewParentAdmin)
admin.site.register(PodcastReview, PodcastReviewAdmin)
admin.site.register(EpisodeReview, EpisodeReviewAdmin)
admin.site.register(Language)
admin.site.register(CoverImage, CoverImageAdmin)
admin.site.register(AudioFile, AudioFileAdmin)
