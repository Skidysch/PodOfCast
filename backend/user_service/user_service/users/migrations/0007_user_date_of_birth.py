# Generated by Django 5.0.6 on 2024-06-22 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_user_followed_users"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="date_of_birth",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
