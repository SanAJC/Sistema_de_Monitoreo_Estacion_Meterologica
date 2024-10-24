import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card';
import '/src/styles/Card.css';

const CurrentSolarCard = () => {
  const [solar, setSolar] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/solar-radiation/');
        const lastDataPoint = response.data[response.data.length - 1];
        if (lastDataPoint) {
          setSolar(lastDataPoint.solar_radiation);
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
    <Card title="Radiacion Actual">
      <div className="current-value">
        <img src="/src/assets/sol.png" alt="Icono de sol" />
        <h2>{solar}W/m²</h2>
      </div>
    </Card>
  );
};

export default CurrentSolarCard;