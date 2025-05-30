# Generated by Django 5.2 on 2025-05-03 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='videomodel',
            name='duration',
        ),
        migrations.AddField(
            model_name='coursemodel',
            name='created_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='videomodel',
            name='created_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='videomodel',
            name='video_url',
            field=models.CharField(max_length=255),
        ),
    ]
