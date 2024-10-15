from django.db import models

# Superclase para la estación meteorológica
class WeatherStation(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True  # no se crea tabla en la DB

# Tabla combinada para Temperatura y Humedad (sensor DHT11)
class TemperatureHumidityData(WeatherStation):
    temperature = models.FloatField()
    humidity = models.FloatField()

    def __str__(self):
        return f"Temperatura: {self.temperature}°C, Humedad: {self.humidity}% - {self.timestamp}"
'''
# Subclase para Radiación Solar
class SolarRadiationData(WeatherStation):
    solar_radiation = models.FloatField()

    def __str__(self):
        return f"Radiación solar: {self.solar_radiation} W/m² - {self.timestamp}"

# Subclase para Lluvia
class RainData(WeatherStation):
    rain_intensity = models.FloatField()

    def __str__(self):
        return f"Lluvia: {self.rain_intensity} mm - {self.timestamp}"

'''

