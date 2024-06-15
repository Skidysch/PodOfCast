from django.shortcuts import render
from rest_framework import generics

from users.models import User
from users.serializers import CustomUserSerializer


class UsersList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class UsersDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
