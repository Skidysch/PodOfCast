from rest_framework import generics

from podcasts.models import Podcast, Episode
from podcasts.serializers import PodcastSerializer, EpisodeSerializer


class PodcastListCreateView(generics.ListCreateAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer


class PodcastDetailView(generics.RetrieveAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer


class EpisodeListCreateView(generics.ListCreateAPIView):
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer


class EpisodeDetailView(generics.RetrieveAPIView):
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer
