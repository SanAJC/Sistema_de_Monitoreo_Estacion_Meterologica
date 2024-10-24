from rest_framework import serializers
from .models import TemperatureHumidityData , SolarRadiationData

class TemperatureHumidityDataSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = TemperatureHumidityData
        fields = '__all__'

class SolarRadiationDataSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = SolarRadiationData
        fields = '__all__'
