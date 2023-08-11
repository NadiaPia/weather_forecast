import React from 'react';
import Day from './Day';


function NDays(props) {
  return (
    <div>
      {props.data.forecast.forecastday.map((day) => ( 
        <Day day={day}/>
      ))}
    </div>
  )
}

export default NDays;
