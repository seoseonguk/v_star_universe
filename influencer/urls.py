from django.urls import path
from django.views.generic import TemplateView

from .views import InfluencerListView

urlpatterns = [
    path('influencer/', TemplateView.as_view(template_name="influencer/index.html")),
    path('signup/', TemplateView.as_view(template_name="influencer/signup.html")),

    path('influencer/list', InfluencerListView.as_view())

]