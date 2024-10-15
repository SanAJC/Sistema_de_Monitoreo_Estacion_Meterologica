from rest_framework import viewsets
from .models import TemperatureHumidityData
from .serializers import TemperatureHumidityDataSerializer

class TemperatureHumidityDataViewSet(viewsets.ModelViewSet):
    queryset = TemperatureHumidityData.objects.all()
    serializer_class = TemperatureHumidityDataSerializer

