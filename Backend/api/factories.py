from .models import TemperatureHumidityData , SolarRadiationData , RainData

class WeatherDataFactory:
    @staticmethod
    # Patrón Factory: controla la creación de instancias según el tipo de datos solicitado.
    def create_data(data_type, value1, value2=None):
        if data_type == 'temperature_humidity':
            return TemperatureHumidityData.objects.create(temperature=value1, humidity=value2)
        elif data_type == 'solar_radiation':
            return SolarRadiationData.objects.create(solar_radiation=value1)
        elif data_type =='water_rain':
            return RainData.objects.create(water_level=value1,rain_intensity=value2)
        else:
            raise ValueError(f"Tipo de dato no reconocido: {data_type}")
