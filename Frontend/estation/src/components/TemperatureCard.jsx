import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/Card.css';

const CurrentTemperatureCard = () => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/TemperatureHumidityData/');
        const lastDataPoint = response.data[response.data.length - 1];
        if (lastDataPoint) {
          setTemperature(lastDataPoint.temperature);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); 
    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Card title="Temperatura Actual">
      <div className="current-value">
        <img src="/src/assets/temperatura.png" alt="Icono de temperatura" />
        <h2>{temperature}°C</h2>
      </div>
    </Card>
  );
};

export default CurrentTemperatureCard;

