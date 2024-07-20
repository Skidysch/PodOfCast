from rest_framework import generics

from users.models import User
from users.serializers import CustomUserSerializer


class UsersList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class UsersDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
