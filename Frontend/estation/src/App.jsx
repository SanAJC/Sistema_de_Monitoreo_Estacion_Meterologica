import React, { useState } from 'react';
import TemperaturaChart from './components/TemperaturaChart';
import TemperaturaPieChart from './components/TemperaturaPieChart';
import CurrentTemperatureCard from './components/TemperatureCard';

import './styles/App.css'

function App() {

  const [category , setCategory]=useState("temperatura");

  const handleCategoryChange =(category) =>{
    setCategory(category);
  }
  return (
    <div className="App">
      <header>
        <h1>Sistema de monitoreo del clima </h1>
        <button type="submit">Informe</button>
      </header>
      <div className="Content">
        <aside>
          <nav>
            <ul onClick={() => handleCategoryChange('temperatura')}>
              <img src='/src/assets/temp.png' alt="Temperatura"/>
              <li>Temperatura</li>
            </ul>
            <ul onClick={() => handleCategoryChange('humedad')}>
              <img src='/src/assets/hum.png' alt="Humedad"/>
              <li>Humedad</li>
            </ul>
            <ul onClick={() => handleCategoryChange('radiacion')}>
              <img src='/src/assets/luz.png' alt="Radiacion"/>
              <li>Radiacion</li>
            </ul>
            <ul onClick={() => handleCategoryChange('lluvia')}>
              <img src='/src/assets/lluvia.png' alt="Lluvia"/>
              <li>Lluvia</li>
            </ul>
          </nav>
        </aside>

        <section className="dashboard">
          {category === 'temperatura' && (
            <>
              <TemperaturaPieChart />
              <CurrentTemperatureCard />
              <div className="dashboard-category">
                <TemperaturaChart />
              </div>
            </>
          )}

          {category === 'humedad' && (
            <>
              <HumedadPieChart />
              <CurrentHumedadCard />
              <div className="dashboard-category">
                <HumedadChart />
              </div>
            </>
          )}

        </section>
      </div>
    </div>
    
  );
}

export default App;
