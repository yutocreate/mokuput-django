from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework import routers

router = routers.SimpleRouter()

urlpatterns = [
    path('', include(router.urls)),
    url('signup/', views.AuthRegister.as_view()),
    url('mypage/', views.AuthInfoGetView.as_view()),
    url(r'^auth_update/$', views.AuthInfoUpdateView.as_view()),
]
