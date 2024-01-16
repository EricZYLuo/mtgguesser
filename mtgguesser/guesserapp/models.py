from django.db import models

# Create your models here.


class Account(models.Model):
    username = models.CharField("Username", max_length=256)
    email = models.EmailField()
    # Remember to salt passwords so that they are scarmbled in database
    password = models.CharField("Password", max_length=256)
    total_guesses = models.IntegerField()
    total_correct = models.IntegerField()
    most_popular = models.JSONField()
    extra_stats = models.JSONField()