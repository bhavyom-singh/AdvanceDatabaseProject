from django.contrib import admin
from .models import React

class ReactAdmin(admin.ModelAdmin):
    list_display = ("name", "createdat","interestedin", "age", "email", "gender")

# Register your models here.

admin.site.register(React, ReactAdmin)