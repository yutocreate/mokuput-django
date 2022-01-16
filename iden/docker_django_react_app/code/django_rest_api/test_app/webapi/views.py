from webapi.models import Profile, Channel
from webapi.serializers import ProfileSerializer,ChannelSerializer
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
class ChannelSerializer(viewsets.ModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    