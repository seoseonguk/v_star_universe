from django.contrib import admin
from .models import Influencer, SubCategory, MainCategory

# Register your models here.
admin.site.register(Influencer)
admin.site.register(SubCategory)
admin.site.register(MainCategory)