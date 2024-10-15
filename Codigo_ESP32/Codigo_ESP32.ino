#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

// Configuración de WiFi
const char* ssid = "TIGO007998";
const char* password = "B3VX61UM";

// Configuración de MQTT
const char* mqtt_server = "broker.hivemq.com";  // Puedes usar tu propio broker local o en la nube
const char* topic = "weather/temperature_humidity";

// Configuración del sensor DHT
#define DHTPIN 4        
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Cliente WiFi y MQTT
WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
}

void reconnect() {
  // Loop hasta que la ESP32 se conecte al broker MQTT
  while (!client.connected()) {
    Serial.print("Intentando conectarse al broker MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Conectado");
    } else {
      Serial.print("Fallo de conexión, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  setup_wifi();  
  client.setServer(mqtt_server, 1883);  // Conectar al broker MQTT
}

void loop() {
  if (!client.connected()) {
    reconnect();  
  }
  client.loop();

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Fallo en la lectura del sensor DHT11");
    return;
  }

  // Convertir los datos a formato JSON
  String payload = "{\"temperature\": " + String(t) + ", \"humidity\": " + String(h) + "}";
  
  // Publicar los datos en el topic
  client.publish(topic, (char*) payload.c_str());
  
  delay(5000);
}
