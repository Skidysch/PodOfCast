# Generated by Django 5.0.6 on 2024-06-22 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_rename_name_user_first_name_user_company_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="bio",
            field=models.TextField(blank=True, null=True),
        ),
    ]