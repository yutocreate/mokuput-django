from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register('channel', views.ChannelSerializer)

urlpatterns = [
    path('api/profile/', views.ProfileListCreate.as_view() ),
    path('', include(router.urls)),
]