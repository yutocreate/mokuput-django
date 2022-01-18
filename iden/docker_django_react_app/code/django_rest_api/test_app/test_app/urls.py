from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('webapi.urls')),
    url(r'^login/', obtain_jwt_token),
    url('user/', include('user.urls')),
]
