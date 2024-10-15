from django.apps import AppConfig

class ApiConfig(AppConfig):
    name = 'api'
    def ready(self):
        # Importar aquí el cliente MQTT y arrancarlo solo después de que Django esté listo
        from .mqtt_client import start_mqtt_client
        start_mqtt_client()

