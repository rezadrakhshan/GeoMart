from django.shortcuts import render
from blog.models import Blog
# Create your views here.



def home(request):
    blog = Blog.objects.filter(is_published=True)[:3]
    context = {
        "blogs":blog
    }
    return render(request, 'index.html',context)