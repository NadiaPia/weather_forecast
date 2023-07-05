import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Today from './components/Today';


function App() {

  const [currentComponent, setCurrentComponent] = useState('Today');
  const[location, setLocation] = useState('');
  const[currentTemp, setCurrentTemp] = useState('');
  const[precipitation, setPrecipitation] = useState(''); 
  const[feelsLike, setFeelsLike]= useState('');
  const [localTime, setLocalTime] = useState('')

  // useEffect(() => {
  //   getWeather()
  // }, [location])

  const getWeather = () => {

  axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d27e5f3580d34ff991c55923232906&q=${location}&days=1&aqi=yes&alerts=no`)
  .then((response)=> {    
    console.log("response.dataaaaaaaaaaa", response.data);
    //console.log("response.data.location.name", response.data.location.name);
    //console.log("response.data.current.temp_c", response.data.current.temp_c);
    //console.log("response.data.current.condition.text", response.data.current.condition.text);
    //console.log("response.data.current.feelslike_c", response.data.current.feelslike_c);
    //console.log("response.data.location.localtime_epoch", response.data.location.localtime_epoch); //1688522004
    //console.log("response.data.location.localtime", response.data.location.localtime); //1688522004


    setLocation(response.data.location.name);
    setCurrentTemp(response.data.current.temp_c);
    setPrecipitation(response.data.current.condition.text);
    setFeelsLike(response.data.current.feelslike_c);
    setLocalTime(response.data.location.localtime)

  }).catch((error) => {
    console.log("errorrrr", error)
  })
}

  return (
    // <div className="App">
    //   <button onClick={getWeather}>Show Weather</button>

    //   <div>
    //     <h1>{location} </h1>  
    //     <input 
    //       type="text"
    //       placeholder='City...'
    //       onChange={(event) => { setLocation(event.target.value) }}
    //       />
    //       <div>
    //         <h2>Current Weather</h2>
    //         <h3>temperature: {currentTemp} <span>&#8451;</span></h3>
    //         <h3>precipitation: {precipitation} </h3>


    //       </div>
    //   </div>
    // </div>

    <div className="App">
      <div className="content">
      <Navbar setLocation={setLocation} location={location} setCurrentComponent={setCurrentComponent} getWeather={getWeather}/>
      {currentComponent === "Today" && <Today
       currentTemp={currentTemp} 
       precipitation={precipitation}
       feelsLike={feelsLike}
       localTime={localTime}
       />}
      {currentComponent === "Tomorrow" && <p>Tomorrow Component</p>}
      {currentComponent === "3 Days" && <p>3 Days Component</p>}
      </div>
    </div>


    
  );
}

export default App;
