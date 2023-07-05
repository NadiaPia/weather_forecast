import React from 'react';
import './Today.css';
import cloud from '../cloud.png'


function Today(props) {
    return (
        <div className="todayContainer">
            <div className="todayContent">

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
