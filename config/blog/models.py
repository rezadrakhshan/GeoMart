from django.db import models
import uuid
from ckeditor_uploader.fields import RichTextUploadingField
from django_jsonform.models.fields import ArrayField

# Create your models here.


class Blog(models.Model):
    slug = models.UUIDField(primary_key=True, default=uuid.uuid4)
    banner = models.ImageField(upload_to="blogs/")
    title = models.CharField(max_length=150)
    detail = RichTextUploadingField()
    num_of_likes = models.IntegerField(default=0)
    tags = ArrayField(
        models.CharField(max_length=10, blank=True),
        size=8
    )