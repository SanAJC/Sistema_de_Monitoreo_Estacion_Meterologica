from rest_framework import serializers
from .models import TemperatureHumidityData

class TemperatureHumidityDataSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = TemperatureHumidityData
        fields = '__all__'

