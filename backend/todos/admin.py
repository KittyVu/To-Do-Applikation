# todos/admin.py
from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id','titel','status','created_at')
    list_filter = ('status',)
    search_fields = ('titel','beschreibung')
