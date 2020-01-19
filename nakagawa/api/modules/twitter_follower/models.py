from django.db import models
from ..twitter_user.models import TwitterUser

# Create your models here.
class TwitterFollower(models.Model):
  twitter_user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
  follower_id = models.IntegerField('follower_id', blank=True, default=0)