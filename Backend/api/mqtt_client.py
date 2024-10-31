import paho.mqtt.client as mqtt
import json
from django.conf import settings 

def on_message(client, userdata, msg):
    from .factories import WeatherDataFactory  
    payload = json.loads(msg.payload.decode())
    temperature = payload.get("temperature")
    humidity = payload.get("humidity")
    irradiance = payload.get("irradiance")
    water=payload.get("water")
    rain=payload.get("rain")

    print(f"Recibido: Temperatura={temperature}, Humedad={humidity}") 
    
     # Si ambos valores de temperatura y humedad están presentes, se crean juntos
    if temperature is not None and humidity is not None:
        WeatherDataFactory.create_data('temperature_humidity', temperature, humidity)
    if irradiance is not None:
        solar_radiation=round(irradiance / 120.0, 2)
        print(f"Recibido: Irradiancia Solar={solar_radiation}")
        WeatherDataFactory.create_data('solar_radiation', solar_radiation)
    if water is not None and rain is not None:
        WeatherDataFactory.create_data('water_rain', water, rain)
        print(f"Recibido: Nivel del agua={water}, Intensidad de Lluvia={rain}")

    

def start_mqtt_client():
    client = mqtt.Client()
    client.on_message = on_message
    client.username_pw_set("san_ats", "tribecca")  
    client.tls_set(ca_certs=settings.ROOT_CA_PATH)  # Ruta al certificado raíz (root CA)
    client.connect("dc9cdf297a2042e1b8ae427f624eca0a.s1.eu.hivemq.cloud", 8883, 60)  

    client.subscribe("weather/temperature_humidity")  
    client.loop_start()  

