from rest_framework import serializers
from .models import TemperatureHumidityData , SolarRadiationData , RainData

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

class RainDataSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = RainData
        fields = '__all__'
