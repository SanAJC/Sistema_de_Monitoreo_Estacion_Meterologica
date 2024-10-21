import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Card from './Card';
import '../styles/Card.css';  

const HumedadChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/TemperatureHumidityData/');
        const filteredData = response.data.map(item => ({
          timestamp: item.timestamp,
          humidity: item.humidity
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
    <Card title="Humedad - Gráfica de Línea">
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="humidity" stroke="#42AAFF" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default HumedadChart;