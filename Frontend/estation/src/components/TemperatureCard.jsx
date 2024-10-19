import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/Card.css';

const CurrentTemperatureCard = () => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/TemperatureHumidityData/')
      .then((response) => {
        const lastDataPoint = response.data[response.data.length - 1];
        if (lastDataPoint) {
          setTemperature(lastDataPoint.temperature);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <Card title="Temperatura Actual">
      <div className="current-value">
        <img src="/src/assets/temperatura.png"/>
        <h2>{temperature}°C</h2>
      </div>
    </Card>
  );
};

export default CurrentTemperatureCard;
