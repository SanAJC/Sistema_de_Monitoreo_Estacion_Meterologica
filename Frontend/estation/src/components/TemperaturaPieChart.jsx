import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Card from './Card';
import '../styles/Card.css';

const TemperaturaPieChart = () => {
  const [temperature, setTemperature] = useState(0);
  const maxTemperature = 50; // Valor máximo para la temperatura

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

  const gaugeData = [
    { value: temperature },
    { value: maxTemperature - temperature },
  ];

  const COLORS = ['#FF7200', '#374151']; 

  return (
    <Card title="Temperatura">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={gaugeData}
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={95}
            dataKey="value"
            stroke="none"
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <h2 id="data">{temperature}°C / 50°C</h2>
    </Card>
  );
};

export default TemperaturaPieChart;
