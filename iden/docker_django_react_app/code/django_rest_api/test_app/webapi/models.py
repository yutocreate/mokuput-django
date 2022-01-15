from django.db import models
from django.contrib.postgres.fields import ArrayField

class Profile(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField()
    message = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class Channel(models.Model):
    name = models.CharField(max_length=64)
    
    def __str__(self):
        return self.name
    
class User(models.Model):
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()
    experience = models.BooleanField()
    isOnline = models.BooleanField()
    name = models.CharField(max_length=64)
    # useLanguage =
    # willLanguage =