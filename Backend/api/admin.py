from django.contrib import admin
from .models import TemperatureHumidityData

# Registro de modelos para la interfaz de administración
@admin.register(TemperatureHumidityData)
class TemperatureHumidityDataAdmin(admin.ModelAdmin):
    list_display = ('temperature', 'humidity', 'timestamp')  
    list_filter = ('timestamp',) 
    search_fields = ('temperature', 'humidity')  
