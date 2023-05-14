from django.db import models

# Create your models here.
class React(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=200)
    createdat = models.DateField(auto_now=True)
    interestedin = models.CharField(max_length=200)
    gender = models.CharField(max_length=6)
    age = models.IntegerField()
    id = models.IntegerField(primary_key=True)