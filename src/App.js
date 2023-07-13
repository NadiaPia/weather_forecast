import './App.css';
import axios from 'axios';
import React, { useState} from 'react';
import Navbar from './components/Navbar';
import Today from './components/Today';
import Tomorrow from './components/Tomorrow';
import NDays from './components/NDays';



function App() {

  const [data, setData] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('Today');
  const [location, setLocation] = useState('');
  
  const getWeather = () => {

    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d27e5f3580d34ff991c55923232906&q=${location}&days=3&aqi=yes&alerts=no`)
      .then((response) => {
        console.log("response.dataaaaaaaaaaa", response.data);

        setData(response.data);
        setLocation(response.data.location.name);
        
        //setHourlyForecast(response.data.forecast.forecastday[0].hour)
        //setTomorowTime(response.data.forecast.forecastday[1].date)
       
      }).catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (

    <div className="App">
      <div className="content">
        <Navbar
          setLocation={setLocation}
          location={location}
          setCurrentComponent={setCurrentComponent}
          getWeather={getWeather}
        />

        {currentComponent === "Today" && data && <Today data={data} />}

        {currentComponent === "Tomorrow" && data && <Tomorrow data={data} />}

        {currentComponent === "3 Days" && <NDays data={data} />}
      </div>
    </div>
  );
}

export default App;
