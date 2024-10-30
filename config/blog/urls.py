from django.urls import path
from .views import *

app_name = "blog"

urlpatterns = [
    path("blog-detail-<slug>",blog_detail,name="blog_detail")
]
