from django.urls import path
from django.views.generic import TemplateView

from .views import InfluencerListView, InstagramSignupView

urlpatterns = [
    path('', TemplateView.as_view(template_name="influencer/index.html"), name='home'),
    path('influencer/list', InfluencerListView.as_view()),

    path('instalogin', InstagramSignupView.as_view(), name='insta_login')

]