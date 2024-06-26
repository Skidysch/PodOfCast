# Generated by Django 5.0.6 on 2024-06-22 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_alter_user_followed_blogs_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="followed_blogs",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AlterField(
            model_name="user",
            name="followed_podcasts",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
