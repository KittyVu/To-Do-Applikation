from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'titel', 'beschreibung', 'status', 'created_at', 'updated_at']
