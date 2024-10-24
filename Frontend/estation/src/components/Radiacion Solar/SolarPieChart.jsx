import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Card from '../Card';
import '/src/styles/Card.css';

const SolarPieChart = () => {
  const [solar, setSolar] = useState(0);
  const maxSolar = 200.0; 

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

  const gaugeData = [
    { value: solar },
    { value: maxSolar - solar },
  ];

  const COLORS = ['#FFE940', '#374151']; 

  return (
    <Card title="Radiacion">
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
      <h2 id="data">{solar}W/m²/ 200.0 W/m²</h2>
    </Card>
  );
};

export default SolarPieChart;