import React, { useState, useEffect } from 'react';


import './Today.css';
import cloud from '../cloud.png';
import { timeFormater } from "../helpers/timeHelpers";
import LineChart from './LineChart';



function Today(props) {

    const localData = props.localTime; //2023-07-05 12:43
    const [tempData, setTempData] = useState(null)


    const { year, day, month, hour, min } = timeFormater(props.localTime)

    const hourly = (props.hourlyForecast || []).map((hour, i) => {
        //console.log("hourly", i, timeFormater(hour.time).hour, hour.temp_c) //[0 '2023-07-07 00:00' 15.8,   1 '2023-07-07 01:00' 15.1 ...]
        return {
            hour: timeFormater(hour.time).hour,
            temp: hour.temp_c
        }

    });

    console.log("hourlyyy", hourly)// [{hour: '01', temp: 25.9}, {hour: '02', temp: 25.6}, ...]     

    useEffect(() => {
        setTempData({
            labels: (hourly || []).map((data) => data.hour), //['00:00', '01:00','02:00','03:00'...]
            datasets: [{
                label: "temp",
                data: (hourly|| []).map((data) => data.temp),
                backgroundColor: ["yellow"], //optinal
                borderColor: "black",
                borderWidth: 1,    
            }]
        })

    }, [props.hourlyForecast])
   
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

                <div style={{ width: 300 }}>
                    {tempData && <LineChart chartData={tempData} />}
                </div>

            </div>

        </div>

    )
}

export default Today;
