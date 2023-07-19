import React, { useState, useEffect } from 'react';
import './Today.css';
import { timeFormater } from "../helpers/timeHelpers";
import LineChart from './LineChart';

function Today(props) {

    //props.data.location.localtime => 2023-07-05 12:43
    const [tempData, setTempData] = useState(null)


    const { year, day, month, hour, min, dayOfWeek } = timeFormater(props.data.location.localtime) //setLocalTime(response.data.location.localtime); //Today, Tomorrow, 3 days
    //const dayOfWeek = findWeekDay(props.data.forecast.forecastday[0].date)
    const hourly = (props.data.forecast.forecastday[0].hour || []).map((hour, i) => {
        //console.log("hourly", i, timeFormater(hour.time).hour, hour.temp_c) //[0 '2023-07-07 00:00' 15.8,   1 '2023-07-07 01:00' 15.1 ...]
        return {
            hour: timeFormater(hour.time).hour,
            temp: hour.temp_c
        }

    });

    //console.log("hourlyyy", hourly)// [{hour: '01', temp: 25.9}, {hour: '02', temp: 25.6}, ...]     

    useEffect(() => {
        setTempData({
            labels: (hourly || []).map((data) => (Number(data.hour).toString())), //['00:00', '01:00','02:00','03:00'...]
            datasets: [{
                data: (hourly || []).map((data) => Math.round(data.temp)),
                backgroundColor: "rgba(238, 252, 66, 0.85)", //optinal
                borderColor: "black",
                borderWidth: 1,
                fill: 'origin',
                pointBackgroundColor: "yellow",
                pointRadius: 1,
                tension: 0.4,

            }],
            // options: {

            //     scales: {
            //         x: {

            //             ticks: {
            //                 // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            //                 callback: function (val, index) {
            //                     // Hide every 2nd tick label
            //                     return index % 2 === 0 ? this.getLabelForValue(val) : '';
            //                 },           //                

            //             }
            //         },


            //     },
            //     
            // },


        })

    }, [props.data.forecast.forecastday[0].hour])

    return (
        <div className="todayContainer">
            <div className="todayContent">

                <div className="currentTime">
                    {props.data.location.localtime && <div className="data">{`${dayOfWeek}, ${month} ${day}, ${hour}:${min}`}</div>}
                </div>

                <div className="currentTemp">
                    <span className="tempValue">{props.data.current.temp_c} {props.data.current.temp_c && <p className="celsium">&#8451;</p>}</span>

                    <div className="symbolContainer">
                        {props.data.current.condition.text && <img className="symbol" alt="pic" src={props.data.current.condition.icon} />}
                    </div>
                </div>
                <div className="feelsAndprecip" >
                    {props.data.current.feelslike_c && <div className="feelsLike"> Feels like {props.data.current.feelslike_c}&#8451;</div>}
                    <div className="precipitation" >{props.data.current.condition.text} </div>
                </div>

                <div className="chartBox">
                    <div className='chartContainer'>
                        {tempData && <LineChart chartData={tempData}/>}
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Today;
