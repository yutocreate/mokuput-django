from django.db import models

# Create your models here.
class Association(models.Model):
  id = models.IntegerField('id', blank=True, default=0)
  search_engin_id = models.CharField('engin_id', max_length=255, blank=True)
  name = models.CharField('name', max_length=255, blank=True)
  domain = models.CharField('domain', max_length=255, blank=True)
  terms_url = models.CharField('terms_url', max_length=255, blank=True)
 
  def __str__(self):
    return self.name