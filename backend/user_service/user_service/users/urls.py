from django.urls import path
from users.views import UsersList, UsersDetail, UserOnboarding

app_name = "users"

urlpatterns = [
    path(
        "",
        UsersList.as_view(),
        name="user-list",
    ),
    path(
        "<uuid:pk>/",
        UsersDetail.as_view(),
        name="user-detail",
    ),
    path(
        "onboarding/<uuid:pk>/",
        UserOnboarding.as_view(),
        name="onboarding",
    ),
]
