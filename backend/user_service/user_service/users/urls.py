from django.urls import path
from users.views import UsersList, UsersDetail

app_name = "users"

urlpatterns = [
    path("", UsersList.as_view(), name="user-list"),
    path("<uuid:pk>/", UsersDetail.as_view(), name="user-detail"),
]
