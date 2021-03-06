# Generated by Django 2.1.7 on 2022-01-16 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('email', models.EmailField(max_length=254)),
                ('experience', models.BooleanField()),
                ('isOnline', models.BooleanField()),
                ('name', models.CharField(max_length=64)),
            ],
        ),
    ]
