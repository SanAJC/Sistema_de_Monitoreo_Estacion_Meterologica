import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Card from '../Card';
import '/src/styles/Card.css';

const SolarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/solar-radiation/');
        const filteredData = response.data.map(item => ({
          timestamp: item.timestamp,
          solar_radiation: item.solar_radiation
        }));
        setData(filteredData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); 
    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Card title="Radiacion Solar - Tiempo">
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="solar_radiation" stroke="#FFE940" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SolarChart;
