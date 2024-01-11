from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('pk', 'username', 'email', 'total_guesses', 'total_correct', 'most_popular', 'extra_stats')