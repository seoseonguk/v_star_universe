"""v_star_universe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf.urls import url

from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from influencer import views


router = routers.DefaultRouter()
router.register(r'/influencer', views.InfluencerViewSet)

schema_view = get_swagger_view(title='Influencer API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('influencer.urls')),

    path('api', include(router.urls)),
    path('api/swagger', schema_view),
    path('api/auth', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += [
    url(r'^accounts/', include('allauth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
]
