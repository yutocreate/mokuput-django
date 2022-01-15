from rest_framework import serializers
from webapi.models import Profile, Channel



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'email', 'message', 'created_at')
        
class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'name')
        
# class UserSerializer(serializers.ModelSeriallizer):



