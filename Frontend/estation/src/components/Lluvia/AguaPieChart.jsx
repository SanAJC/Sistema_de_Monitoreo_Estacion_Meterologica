import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Card from '../Card';
import '/src/styles/Card.css';

const WaterPieChart = () => {
  const [water, setWater] = useState(0);
  const maxWater = 100; 

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

  const gaugeData = [
    { value: water },
    { value: maxWater - water },
  ];

  const COLORS = ['#42AAFF', '#374151']; 

  return (
    <Card title="Nivel de agua">
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
      <h2 id="data">{water}ml / 100.0ml</h2>
    </Card>
  );
};

export default WaterPieChart;
