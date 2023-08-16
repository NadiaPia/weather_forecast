import React from 'react';
import Day from './Day';


function NDays(props) {
  return (
    <div>
      {props.data.forecast.forecastday.map((day, key) => ( 
        <Day day={day} key={`day-${key}`}/>
      ))}
    </div>
  )
}

export default NDays;
