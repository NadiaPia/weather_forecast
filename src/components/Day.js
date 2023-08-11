import React, {useState} from 'react';
import './Day.css';
import { timeFormater } from "../helpers/timeHelpers";

function Day(props) {
  console.log("props.day", props.day);
  const[hidden, setHidden] = useState(true);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

  let date = new Date(props.day.date);
  const offset = (new Date()).getTimezoneOffset(); //get differance with UTC in minutes
  date.setHours(date.getHours() + (offset / 60)) //shift hours of the date to differance with UTC
  const weekdayIndex = date.getDay();
  const dayOfWeek = weekday[weekdayIndex];

  const { year, day, month, hour, min } = timeFormater(props.day.date);
  
  return (
    <div className="dayContainer">
      <div className="dayComponent">

        <div className="dayHeader" onClick={() => setHidden(prev => !prev)}>
          <div className="dayHeaderLeft">
            <div className="monthDay">{`${dayOfWeek}, ${month} ${day}`}</div>
            <div >{props.day.day.condition.text}</div>
          </div>

          <div className="dayHeaderRight">
            <div><img className="symbol" alt="pic" src={props.day.day.condition.icon} /></div>
            <div className="maxMinTemp">
              <div className='temp'>{Math.round(props.day.day.maxtemp_c)}<p className="celsiumDay">&#176;</p></div>
              <div className='temp'>{Math.round(props.day.day.mintemp_c)}<p className="celsiumDay">&#176;</p></div>
            </div>

          </div>
        </div>

        <div className={hidden? "hiddenPart": ""}>
          <div className="dayBody">

            <div className="humidity">
              <div className="humidityLabel">
                Max. Wind
              </div>
              <div className="humidityValue">
                {`${props.day.day.maxwind_kph} km/h`}
              </div>
            </div>

            <div className="humidity">
              <div className="humidityLabel">
                Humidity
              </div>
              <div className="humidityValue">
                {`${props.day.day.avghumidity}%`}
              </div>
            </div>

            <div className="humidity">
              <div className="humidityLabel">
                Sunrise/Sunset
              </div>
              <div className="humidityValue">
                {`${props.day.astro.sunrise} / ${props.day.astro.sunset}`}
              </div>
            </div>

          </div>

          <div className="dayFooter">

            {props.day.hour.map((everyhour) => {
              return (
                <div className="hourBlock">
                  <div className='temp'>{Math.round(everyhour.temp_c)}<p className="celsiumDay">&#176;</p></div>
                  <div className='hourSymbol'><img alt="pic" src={everyhour.condition.icon} /></div>
                  <div className='hourValue'>                    
                    {timeFormater(everyhour.time).hour}:00

                  </div>
                </div>
              )
            })}

          </div>
        </div>

      </div>

    </div>
  )
}

export default Day;
