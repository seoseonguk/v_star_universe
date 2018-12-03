from django.urls import path
from django.views.generic import TemplateView

from .views import InfluencerListView

urlpatterns = [
    path('', TemplateView.as_view(template_name="influencer/index.html")),
    path('influencer/list', InfluencerListView.as_view())

]