from .models import Influencer
from rest_framework import serializers

class InfluencerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Influencer
        fields = ('__all__')