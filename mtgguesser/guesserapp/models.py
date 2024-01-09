from django.db import models

# Create your models here.


class Account(models.Model):
    username = models.CharField("Username", max_length=256)
    email = models.EmailField()
    total_guesses = models.IntegerField()
    total_correct = models.IntegerField()
    most_popular = models.JSONField()
    extra_stats = models.JSONField()