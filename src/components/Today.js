import React, { useState, useEffect } from 'react';
import './Today.css';
import { timeFormater } from "../helpers/timeHelpers";
import LineChart from './LineChart';

function Today(props) {
    //props.data.location.localtime => 2023-07-05 12:43
    const [tempData, setTempData] = useState(null);

    const { year, day, month, hour, min, dayOfWeek } = timeFormater(props.data.location.localtime) //setLocalTime(response.data.location.localtime); //Today, Tomorrow, 3 days
    //const dayOfWeek = findWeekDay(props.data.forecast.forecastday[0].date)
    const hourly = (props.data.forecast.forecastday[0].hour || []).map((hour, i) => {
        //console.log("hourly", i, timeFormater(hour.time).hour, hour.temp_c) //[0 '2023-07-07 00:00' 15.8,   1 '2023-07-07 01:00' 15.1 ...]
        return {
            hour: timeFormater(hour.time).hour,
            temp: hour.temp_c
        }
    });

    //console.log("hourly", hourly)// [{hour: '01', temp: 25.9}, {hour: '02', temp: 25.6}, ...]     

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
            }],  
        })

    }, [props.data.forecast.forecastday[0].hour])

    return (
        <div className="todayContainer">
            <div className="todayContent">

                <div className="currentTime">
                    {props.data.location.localtime && <div className="data">{`${dayOfWeek}, ${month} ${day}, ${hour}:${min}`}</div>}
                </div>

                <div className="currentTemp">
                    <span className="tempValue">{props.data.current.temp_c}{(props.data.current.temp_c).toString() && <p className="celsium">&#8451;</p>}</span> {/*.toString() because temp=0 would be considered as false */}
                    <div className="symbolContainer">
                        {props.data.current.condition.text && <img className="symbol" alt="pic" src={props.data.current.condition.icon} />}
                    </div>
                </div>
                <div className="feelsAndprecip" >
                    {props.data.current.feelslike_c && <div className="feelsLike"> Feels like {Math.round(props.data.current.feelslike_c)}&#8451;</div>}
                    <div className="precipitation" >{props.data.current.condition.text} </div>
                </div>

                <div className="chartBox">
                    <div className='chartContainer'>
                        {tempData && <LineChart chartData={tempData} />}
                    </div>
                </div>


                <div className='todayDetailsContainer'>

                    <div className='detailsTitle'>
                        <p>Current details</p>
                    </div>

                    <div className='todayDetails'>

                        <div className="detailsParameters">
                            <div className='detailsHumidity'>
                                <p>Humidity</p>
                            </div>
                            <div className='detailsPressure'>
                                <p>Pressure</p>
                            </div>
                            <div className='detailsUV'>
                                <p>UVindex</p>
                            </div>
                            <div className='detailsVisibility'>
                                <p>Visibility</p>
                            </div>
                            <div className='detailsWind'>
                                <p>Wind</p>
                            </div>
                        </div>

                        <div className="detailsValues">
                            <div >
                                {props.data.current.humidity}%
                            </div>
                            <div >
                                {(props.data.current.pressure_mb) / 1000} mBar
                            </div>
                            <div >
                                {props.data.current.uv}
                            </div>
                            <div >
                                {props.data.current.vis_km} km
                            </div>
                            <div >
                                {props.data.current.wind_kph} km/h
                            </div>
                        </div>

                    </div>

                    <div className="astroContainer">

                        <div className='astroTitle'>
                            <p>Sunrise / Sunset</p>
                        </div>

                        <div className="astroDetails">
                            <div className="astroParameters">

                                <div className='astroSunrise'>
                                    <p>Sunrise</p>
                                </div>
                                <div className='astroSunset'>
                                    <p>Sunset</p>
                                </div>

                            </div>

                            <div className='astroValues'>
                                <div>
                                    {props.data.forecast.forecastday[0].astro.sunrise}
                                </div>
                                <div>
                                    {props.data.forecast.forecastday[0].astro.sunset}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    )
}

export default Today;
