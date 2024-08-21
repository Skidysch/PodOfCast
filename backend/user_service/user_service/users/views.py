import logging

from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import User
from users.permissions import IsOwnerOrReadOnly
from users.serializers import CustomUserSerializer, OnboardingSerializer

logger = logging.getLogger(__name__)


class UsersList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class UsersDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = User.objects.get(email=request.data["email"])
            if not user.is_onboarded:
                response.data["onboarding_required"] = True
            else:
                response.data["onboarding_required"] = False
        return response


class UserOnboarding(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = OnboardingSerializer
    permission_classes = [IsOwnerOrReadOnly]
