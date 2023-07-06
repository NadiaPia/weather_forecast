import React from 'react';
import './Today.css';
import cloud from '../cloud.png';
import {timeFormater} from "../helpers/timeHelpers"


function Today(props) {

    const localData = props.localTime; //2023-07-05 12:43
    
    const {year, day, month, hour, min} = timeFormater(props.localTime)

    const hourly = props.hourlyForecast.map((hour,i) => {
        console.log(i, hour.time, hour.temp_c)
    });
    
    return (
        <div className="todayContainer">
            <div className="todayContent">

                <div className="currentTime">
                    {localData && <div className="data">{`${month} ${day}, ${hour}:${min}`}</div>}          

                </div>
                
                <div className="currentTemp">
                    <span className="tempValue">{props.currentTemp} {props.currentTemp && <p className="celsium">&#8451;</p>}</span>

                    <div className="symbolContainer">
                    {props.precipitation && <img className="symbol" alt="pic" src={cloud} />}

                    </div>
                </div>
                <div className="feelsAndprecip" >
                    {props.feelsLike && <div className="feelsLike"> Feels like {props.feelsLike}&#8451;</div>}
                    <div className="precipitation" >{props.precipitation} </div>
                </div>

               
            </div>

        </div>

    )
}

export default Today;
