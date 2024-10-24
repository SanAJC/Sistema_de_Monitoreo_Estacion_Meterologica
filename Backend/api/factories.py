from .models import TemperatureHumidityData , SolarRadiationData

class WeatherDataFactory:
    @staticmethod
    def create_data(data_type, value1, value2=None):
        if data_type == 'temperature_humidity':
            # value1 es la temperatura, value2 es la humedad
            return TemperatureHumidityData.objects.create(temperature=value1, humidity=value2)
        elif data_type == 'solar_radiation':
            # value1 es la irradiancia solar
            return SolarRadiationData.objects.create(solar_radiation=value1)
        else:
            raise ValueError(f"Tipo de dato no reconocido: {data_type}")
