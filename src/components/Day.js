import React from 'react';
import './Day.css';
import { timeFormater } from "../helpers/timeHelpers";



function Day(props) {
  console.log("props.day", props.day);


  const { year, day, month, hour, min } = timeFormater(props.day.date)
  return (
    <div className="dayContainer">
      <div className="dayComponent">
        <div className="dayHeader">
          <div className="dayHeaderLeft">
            <div className="monthDay">{`${month} ${day}`}</div>
            <div >{props.day.day.condition.text}</div>
          </div>

          <div className="dayHeaderRight">
            <div><img className="symbol" alt="pic" src={props.day.day.condition.icon} /></div>
            <div className="maxMinTemp">
            <div className='temp'>{props.day.day.maxtemp_c}<p className="celsiumDay">&#176;</p></div>
            <div className='temp'>{props.day.day.mintemp_c}<p className="celsiumDay">&#176;</p></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Day
