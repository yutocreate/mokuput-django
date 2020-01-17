from django.db import models
from ..twitter_user.models import TwitterUser
from django.utils import timezone

# Create your models here.
class Tweet(models.Model):
  created_at = models.DateTimeField("date", default=timezone.now)
  tweet_id = models.BigIntegerField('id', blank=True, default=0)
  twitter_user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
  id_str = models.TextField('id_str', blank=True)
  snippet = models.TextField('snippet', blank=True)
  source = models.TextField('source', blank=True)
  truncated = models.BooleanField("truncated")
  in_reply_to_status_id = models.BigIntegerField('in_reply_to_status_id', blank=True, default=0)
  in_reply_to_status_id_str = models.TextField('in_reply_to_status_id_str', blank=True)
  in_reply_to_user_id = models.BigIntegerField('in_reply_to_user_id', blank=True, default=0)
  in_reply_to_user_id_str = models.TextField('in_reply_to_user_id_str', blank=True)
  in_reply_to_screen_name = models.TextField('in_reply_to_screen_name', blank=True)
  # coordinates = Coordinates
  quoted_status_id = models.BigIntegerField('quoted_status_id', blank=True, default=0)
  quoted_status_id_str = 	models.TextField('quoted_status_id_str', blank=True)	
  is_quote_status	= models.BooleanField("is_quoted_status")
  quoted_status	= models.TextField('quoted_status', blank=True)
  retweeted_status = models.TextField('retweeted_status', blank=True)
  quote_count	= models.IntegerField('quoted_count', blank=True, default=0)	
  reply_count	= models.IntegerField('reply_count', blank=True, default=0)	
  retweet_count	= models.IntegerField('retweet_count', blank=True, default=0)
  favorite_count = models.IntegerField('favorite_count', blank=True, default=0)
  # entities	= Entities	
  favorited	=	models.BooleanField("favorited")
  retweeted	= models.BooleanField("retweeted")
  possibly_sensitive	= models.BooleanField("possibly_sensitive")
  lang = models.TextField('lang', blank=True)
  tag = models.TextField('tag', blank=True)
  def __str__(self):
    return self.tweet_id