from django.contrib.auth import get_user_model
from django.urls import reverse
import pytest

User = get_user_model()


@pytest.mark.django_db
def test_create_user(create_user):
    assert create_user.email == "test@email.com"


@pytest.mark.django_db
def test_list_user(create_user):
    users = User.objects.all()
    assert users.count() == 1
    assert users[0].email == "test@email.com"


@pytest.mark.django_db
def test_list_user_via_view(client, create_user):
    url = reverse("users:user-list")

    response = client.get(url)
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["email"] == "test@email.com"


@pytest.mark.django_db
def test_retrieve_user(create_user):
    user = User.objects.get(email="test@email.com")
    assert user is not None
    assert user.email == "test@email.com"


@pytest.mark.django_db
def test_retrieve_user_via_view(client, create_user):
    url = reverse("users:user-detail", kwargs={"pk": create_user.pk})

    response = client.get(url)
    assert response.status_code == 200
    assert response.data["email"] == "test@email.com"
