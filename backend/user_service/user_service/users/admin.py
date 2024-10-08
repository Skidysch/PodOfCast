from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from users.models import ProfileImage, User


class UserAdmin(BaseUserAdmin):
    save_on_top = True
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "company_name",
                    "bio",
                    "is_company",
                    "is_creator",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_onboarded",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            _("Important dates"),
            {
                "fields": (
                    "date_of_birth",
                    "last_login",
                    "date_joined",
                    "last_visit",
                )
            },
        ),
        (
            _("Followed content"),
            {
                "fields": (
                    "followed_users",
                    "followed_podcasts",
                    "followed_blogs",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_creator",
                ),
            },
        ),
    )
    list_display = (
        "email",
        "get_full_name",
        "is_company",
        "is_creator",
    )
    search_fields = (
        "email",
        "first_name",
        "last_name",
        "company_name",
    )
    ordering = ("email",)


admin.site.register(User, UserAdmin)
admin.site.register(ProfileImage)