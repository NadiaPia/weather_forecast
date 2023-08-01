import React, { useState, useEffect } from 'react';
import { timeFormater } from "../helpers/timeHelpers";
import './Tomorrow.css';
import LineChart from './LineChart';




function Tomorrow(props) {

    const [tempData, setTempData] = useState(null)

    const { year, day, month, hour, min, dayOfWeek } = timeFormater(props.data.forecast.forecastday[1].date)
    //console.log("props.data.forecast.forecastday[1].date", props.data.forecast.forecastday[1].date)

    const hourly = (props.data.forecast.forecastday[0].hour || []).map((hour, i) => {
        //console.log("hourly", i, timeFormater(hour.time).hour, hour.temp_c) //[0 '2023-07-07 00:00' 15.8,   1 '2023-07-07 01:00' 15.1 ...]
        return {
            hour: timeFormater(hour.time).hour,
            temp: hour.temp_c
        }

    });

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
                tension: 0.1,
            }]
        })

    }, [props.data.forecast.forecastday[1].hour])
    return (
        <div className="tomorrowContainer">
            <div className="tomorrowContent">

                <div className="tomorrowCondition">

                    <div className="tomorrowDate">
                        {props.data.forecast.forecastday[1].date && <div className="date">{`${dayOfWeek}, ${month} ${day}`}</div>}
                        <div className="tomorrowConditionText">{props.data.forecast.forecastday[1].day.condition.text}</div>
                    </div>

                    <div className="iconContainer">
                        <img className="tomorrowConditionIcon" alt="pic" src={props.data.forecast.forecastday[1].day.condition.icon} />
                    </div>

                </div>

                <div className="tomorrowChartBox">
                    <div className='tomorrowChartContainer'>
                        {tempData && <LineChart chartData={tempData} />}
                    </div>
                </div>

                <div className='tomorrowDetailsContainer'>

                    <div className='tomorrowDetailsTitle'>
                        <p>Details</p>
                    </div>

                    <div className='tomorrowDetails'>

                        <div className="tomorrowDetailsParameters">
                            <div className='tomorrowDetailsHumidity'>
                                <p>Average Humidity</p>
                            </div>
                           
                            <div className='tomorrowDetailsUV'>
                                <p>UVindex</p>
                            </div>
                            <div className='tomorrowDetailsVisibility'>
                                <p>Average Visibility</p>
                            </div>
                            <div className='tomorrowDetailsWind'>
                                <p>Max Wind</p>
                            </div>
                        </div>

                        <div className="tomorrowDetailsValues">
                            <div >
                                {props.data.forecast.forecastday[1].day.avghumidity}%
                            </div>
                            
                            <div >
                                {props.data.forecast.forecastday[1].day.uv}
                            </div>
                            <div >
                                {props.data.forecast.forecastday[1].day.avgvis_km} km
                            </div>
                            <div >
                                {props.data.forecast.forecastday[1].day.maxwind_kph} km/h
                            </div>
                        </div>

                    </div>





                    <div className="tomorrowAstroContainer">

                        <div className='tomorrowAstroTitle'>
                            <p>Sunrise / Sunset</p>
                        </div>

                        <div className="tomorrowAstroDetails">
                            <div className="tomorrowAstroParameters">

                                <div className='tomorrowAstroSunrise'>
                                    <p>Sunrise</p>
                                </div>
                                <div className='tomorrowAstroSunset'>
                                    <p>Sunset</p>
                                </div>

                            </div>

                            <div className='tomorrowAstroValues'>
                                <div>
                                    {props.data.forecast.forecastday[1].astro.sunrise}
                                </div>
                                <div>
                                    {props.data.forecast.forecastday[1].astro.sunset}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>



        </div>
    )
}

export default Tomorrow
