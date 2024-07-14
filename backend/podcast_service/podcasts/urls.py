from django.urls import path

from podcasts.views import (
    PodcastListCreateView,
    PodcastDetailView,
    EpisodeListCreateView,
    EpisodeDetailView,
)

appname = "podcasts"

urlpatterns = [
    path(
        "podcasts/",
        PodcastListCreateView.as_view(),
        name="podcasts-list",
    ),
    path(
        "podcasts/<int:pk>",
        PodcastDetailView.as_view(),
        name="podcasts-detail",
    ),
    path(
        "episodes/",
        EpisodeListCreateView.as_view(),
        name="episodes-list",
    ),
    path(
        "episodes/<int:pk>",
        EpisodeDetailView.as_view(),
        name="episodes-detail",
    ),
]
