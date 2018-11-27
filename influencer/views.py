from django.shortcuts import render
from rest_framework import viewsets
from .serializers import InfluencerSerializer
from .models import Influencer

class InfluencerViewSet(viewsets.ModelViewSet):
    queryset = Influencer.objects.all()
    serializer_class = InfluencerSerializer