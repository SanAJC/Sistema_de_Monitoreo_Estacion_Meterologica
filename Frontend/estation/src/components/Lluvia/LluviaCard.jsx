import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card';
import '/src/styles/Card.css';

const CurrentRainCard = () => {
  const [rain, setRain] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/water-rain/');
        const lastDataPoint = response.data[response.data.length - 1];
        if (lastDataPoint) {
          setRain(lastDataPoint.rain_intensity);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); 
    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  const getRainStatus = () => {
    if (rain >= 400) return "Seco";             // Seco: valor alto
    if (rain >= 200 && rain < 400) return "Mojado";  // Mojado: valor intermedio
    if (rain < 200) return "Inundado";           // Inundado: valor bajo
    return "Estado desconocido"; 
};

  return (
    <Card title="Presencia de Lluvia Actual">
      <div className="current-value">
        <img src="/src/assets/lluvi.png" alt="Icono de lluvia" />
        <h2>{getRainStatus()}</h2>
      </div>
    </Card>
  );
};

export default CurrentRainCard;