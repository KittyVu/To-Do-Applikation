from django.db import models

class Todo(models.Model):
    titel = models.CharField(max_length=200)
    beschreibung = models.TextField(blank=True)
    status = models.TextField(default="offen")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titel
