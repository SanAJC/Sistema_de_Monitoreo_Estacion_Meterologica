import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card';
import '/src/styles/Card.css';

const CurrentWaterCard = () => {
  const [water, setWater] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/water-rain/');
        const lastDataPoint = response.data[response.data.length - 1];
        if (lastDataPoint) {
          setWater(lastDataPoint.water_level);
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
    <Card title="Nivel de Lluvia Actual">
      <div className="current-value">
        <img src="/src/assets/nivel-de-agua.png" alt="Icono de agua" />
        <h2>{water} ml</h2>
      </div>
    </Card>
  );
};

export default CurrentWaterCard;