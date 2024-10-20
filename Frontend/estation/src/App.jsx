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
            <ul onClick={() => handleCategoryChange('temperatura')} id='hover-temp'>
              <img src='/src/assets/temp.png' alt="Temperatura" id='temp'/>
              <li>Temperatura</li>
            </ul>
            <ul onClick={() => handleCategoryChange('humedad')}id='hover-hum'>
              <img src='/src/assets/hum.png' alt="Humedad" id='hum'/>
              <li>Humedad</li>
            </ul>
            <ul onClick={() => handleCategoryChange('radiacion')}id='hover-radi'>
              <img src='/src/assets/luz.png' alt="Radiacion" id='radi'/>
              <li>Radiacion</li>
            </ul>
            <ul onClick={() => handleCategoryChange('lluvia')}id='hover-lluvi'>
              <img src='/src/assets/lluvia.png' alt="Lluvia" id='lluvi'/>
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
