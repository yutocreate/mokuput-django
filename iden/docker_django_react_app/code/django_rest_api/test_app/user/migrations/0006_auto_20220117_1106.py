# Generated by Django 2.1.7 on 2022-01-17 11:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20220117_1022'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='username',
        ),
        migrations.AlterModelTable(
            name='account',
            table=None,
        ),
    ]
