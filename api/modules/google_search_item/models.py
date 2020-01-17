from django.db import models
from ..google_search_result.models import GoogleSearchResult

# Create your models here.
class GoogleSearchItem(models.Model):
  id = models.IntegerField('id', blank=True, default=0)
  google_search_result = models.ForeignKey(GoogleSearchResult, on_delete=models.CASCADE)
  title = models.TextField('title', blank=True)
  html_title = models.TextField('html_title', blank=True)
  link = models.CharField('link', max_length=255, blank=True)
  display_link = models.CharField('display_link', max_length=255, blank=True)
  snippet = models.TextField('snippet', blank=True, default=0)
  html_snippet = models.TextField('html_snippet', blank=True)
  formatted_url = models.URLField('formatted_url', max_length=200, blank=True)
  html_formatted_url = models.URLField('html_formatted_url', max_length=200, blank=True)

  def __str__(self):
    return self.id