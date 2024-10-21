import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/Card.css';

const CurrentHumedadCard = () => {
  const [humedad, sethuemdad] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/TemperatureHumidityData/');
        const lastDataPoint = response.data[response.data.length - 1];
        if (lastDataPoint) {
          sethuemdad(lastDataPoint.humidity);
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
    <Card title="Humedad Actual">
      <div className="current-value">
        <img src="/src/assets/humedad.png" alt="Icono de humedad" />
        <h2>{humedad}%</h2>
      </div>
    </Card>
  );
};

export default CurrentHumedadCard;