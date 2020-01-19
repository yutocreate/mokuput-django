from django.db import models
from ..twitter_user.models import TwitterUser

# Create your models here.
class TwitterFriend(models.Model):
  twitter_user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
  friend_id = models.IntegerField('friend_id', blank=True, default=0)