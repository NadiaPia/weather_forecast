import React from 'react';
import './Day.css';


function Day(props) {
    console.log("props.day", props.day)
  return (
    <div className="dayContainer">
      <p>{props.day.date}</p>
      <p>{props.day.date_epoch}</p>

    </div>
  )
}

export default Day
