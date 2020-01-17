from django.db import models
from ..google_search_item.models import GoogleSearchItem

# Create your models here.
class GoogleSearchItemPage(models.Model):
  google_search_item_page_id = models.IntegerField('id', blank=True, default=0)
  google_search_item = models.ForeignKey(GoogleSearchItem, on_delete=models.CASCADE)
  html = models.TextField('html', blank=True)
 
  def __str__(self):
    return self.google_search_item_page_id