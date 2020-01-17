from django.db import models
from django.utils import timezone

# Create your models here.
class TwitterUser(models.Model):
  id = models.BigIntegerField('id', blank=True, default=0)
  id_str = models.TextField('id_str', blank=True)
  name = models.CharField('name', max_length=255, blank=True)
  screen_name = models.CharField('screen_name', max_length=255, blank=True)
  location = models.CharField('location', max_length=255, blank=True)
  # derived = models.TextField('derived', blank=True)
  url = models.URLField('url', max_length=200, blank=True)
  description = models.TextField('description', blank=True)
  followers_count = models.IntegerField('followers_count', blank=True, default=0)
  friends_count = models.IntegerField('friends_count', blank=True, default=0)
  listed_count = models.IntegerField('listed_count', blank=True, default=0)
  favorites_count = models.IntegerField('favorites_count', blank=True, default=0)
  statuses_count = models.IntegerField('statuses_count', blank=True, default=0)
  created_at = models.DateTimeField("date", default=timezone.now)
  def __str__(self):
    return self.id