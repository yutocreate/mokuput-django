from django.db import models
from django.utils import timezone

# Create your models here.
class GoogleSearchResult(models.Model):
  google_search_result_id = models.CharField('id', max_length=255)
  search_engin_id = models.CharField('engin-id', max_length=255, blank=True)
  search_date = models.DateTimeField("date", default=timezone.now)
  title = models.CharField('title', max_length=255, blank=True)
  total_results = models.IntegerField('total-results', blank=True, default=0)
  search_terms = models.CharField('title', max_length=255, blank=True)
  count = models.IntegerField('total-results', blank=True, default=0)
  start_index = models.IntegerField('total-results', blank=True, default=0)
  language = models.IntegerField('total-results', blank=True, default=0)
  input_encoding = models.IntegerField('total-results', blank=True, default=0)
  output_encoding = models.IntegerField('total-results', blank=True, default=0)

  def __str__(self):
    return self.google_search_result_id