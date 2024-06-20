import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def create_user(db):
    return User.objects.create_user(
        email="test@email.com",
        password="test_password",
    )
