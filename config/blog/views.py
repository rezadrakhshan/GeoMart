from django.shortcuts import render, get_object_or_404
from .models import Blog

# Create your views here.


def blog_detail(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    return render(request, "blog/blog-detail.html", {"blog": blog})
