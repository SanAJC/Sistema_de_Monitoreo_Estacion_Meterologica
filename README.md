# Sistema de Monitoreo Estación Meteorológica

Este repositorio contiene un sistema diseñado para monitorear datos climáticos obtenidos a través de sensores conectados a una ESP32. La estación meteorológica registra parámetros como temperatura, humedad, presión, y otros datos relevantes, proporcionando una interfaz para visualización y análisis.

---

## **Características**
- Lectura en tiempo real de sensores meteorológicos (DHT11, BMP180, entre otros).
- Comunicación mediante protocolo MQTT para enviar datos a un servidor.
- Interfaz gráfica para la visualización de datos usando herramientas como Grafana.
- Compatibilidad con múltiples sensores.
- Arquitectura modular para una fácil extensión.

---

## **Requisitos**
### **Hardware**
- **ESP32** configurada para capturar datos de sensores.
- Sensores compatibles (ejemplo: DHT11 para temperatura y humedad).
- Fuente de alimentación para la ESP32.
- Cable USB para comunicación.

### **Software**
- Python 3.8 o superior.
- [Arduino IDE](https://www.arduino.cc/en/software) configurado para ESP32.
- MQTT Broker (https://hivemq.cloud/).
- Base de datos MySQL para almacenar datos.
- [Django](https://www.djangoproject.com/) para el backend.
- [React](https://react.dev/) para el frontend

---

## **Instalación**
### **1. Configurar el Hardware**
1. Conecta los  sensores DHT11 , BH1750 , FC-37 y Nivel de agua a la ESP32 según el esquema proporcionado en la documentación.
2. Asegúrate de tener instalado el controlador USB para la ESP32 en tu computadora.

### **2. Configurar el Software**
#### **Backend con Django**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/SanAJC/Sistema_de_Monitoreo_Estacion_Meterologica.git
   cd Sistema_de_Monitoreo_Estacion_Meterologica
2.Configura el backend:
  ```bash
  cd Backend
  python3.12.7 -m venv env
  env\Scripts\activate
  pip install -r requirements.txt
  python manage.py runserver
   ```
3.Configura el frontend:
  ```bash
  cd Frontend
  cd estacion
  npm install
  npm run dev
   ```
4.Consideraciones adicionales
-El back esta configurado con Mysql con su puerto 3306 , ademas que buscara una base de datos ya predeterminada que se recomienda crear
-Luego de creaer la base de datos con el nombre adecuado que puedes ver en settings.py realiza las migraciones
```bash
  python manage.py makemigrations
  python manage.py migrate
  python manage.py createsuperuser
   ```

