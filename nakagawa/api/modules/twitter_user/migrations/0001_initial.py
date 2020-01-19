# Generated by Django 2.1.3 on 2020-01-17 07:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TwitterUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('twitter_user_id', models.BigIntegerField(blank=True, default=0, verbose_name='id')),
                ('id_str', models.TextField(blank=True, verbose_name='id_str')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='name')),
                ('screen_name', models.CharField(blank=True, max_length=255, verbose_name='screen_name')),
                ('location', models.CharField(blank=True, max_length=255, verbose_name='location')),
                ('url', models.URLField(blank=True, verbose_name='url')),
                ('description', models.TextField(blank=True, verbose_name='description')),
                ('followers_count', models.IntegerField(blank=True, default=0, verbose_name='followers_count')),
                ('friends_count', models.IntegerField(blank=True, default=0, verbose_name='friends_count')),
                ('listed_count', models.IntegerField(blank=True, default=0, verbose_name='listed_count')),
                ('favorites_count', models.IntegerField(blank=True, default=0, verbose_name='favorites_count')),
                ('statuses_count', models.IntegerField(blank=True, default=0, verbose_name='statuses_count')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date')),
            ],
        ),
    ]