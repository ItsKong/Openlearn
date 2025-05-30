# Generated by Django 5.0.4 on 2025-05-02 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=255)),
                ('email', models.CharField(blank=True, max_length=255)),
                ('password', models.CharField(blank=True, max_length=100)),
                ('profile', models.ImageField(blank=True, upload_to='')),
            ],
        ),
    ]
