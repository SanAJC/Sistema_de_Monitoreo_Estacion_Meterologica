import paho.mqtt.client as mqtt
import json


def on_message(client, userdata, msg):
    from .factories import WeatherDataFactory  # Importar modelos solo cuando se necesiten
    payload = json.loads(msg.payload.decode())
    temperature = payload.get("temperature")
    humidity = payload.get("humidity")

    print(f"Recibido: Temperatura={temperature}, Humedad={humidity}") 
    
     # Si ambos valores de temperatura y humedad están presentes, se crean juntos
    if temperature is not None and humidity is not None:
        WeatherDataFactory.create_data('temperature_humidity', temperature, humidity)


def start_mqtt_client():
    client = mqtt.Client()
    client.on_message = on_message
    client.connect("broker.hivemq.com", 1883, 60)  # Configura tu broker MQTT
    client.subscribe("weather/temperature_humidity")

    client.loop_start()  # Ejecuta el cliente en un hilo separado

