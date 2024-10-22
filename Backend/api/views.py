from rest_framework import viewsets
from .models import TemperatureHumidityData
from .serializers import TemperatureHumidityDataSerializer
import openpyxl
from django.http import HttpResponse

class TemperatureHumidityDataViewSet(viewsets.ModelViewSet):
    queryset = TemperatureHumidityData.objects.all()
    serializer_class = TemperatureHumidityDataSerializer

def export_excel(request):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Datos Temperatura y Humedad'

    ws.append(['Timestamp', 'Temperatura', 'Humedad'])

    data = TemperatureHumidityData.objects.all()

    for item in data:
        # Remover la zona horaria del timestamp
        timestamp = item.timestamp.replace(tzinfo=None) if item.timestamp else None
        ws.append([timestamp, item.temperature, item.humidity])

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=datos_clima.xlsx'

    wb.save(response)

    return response