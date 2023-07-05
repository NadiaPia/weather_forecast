import React from 'react';
import './Today.css';
import cloud from '../cloud.png'


function Today(props) {

    const localData = props.localTime; //2023-07-05 12:43
    //console.log("localData", localData)
    

    const localDataArray = localData.split(/[\s-]+/) //['2023', '07', '05', '12:43']
    //console.log("localDataArray", localDataArray)
    
    const year = localDataArray[0];  //  '2023'

    const day = () => {
        if(!localDataArray[2]) return;
        if (localDataArray[2][0] === '0') {
            return localDataArray[2].slice(1);            
        } else {
            return localDataArray[2];
        }        
    };
    //console.log("day", day())

    const month = localDataArray[1];
    let monthObject = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    }
    
    const monthWord = monthObject[month]
    //console.log(monthWord)//Jul

    const time = localDataArray[3]; //'13:15'  


    
    return (
        <div className="todayContainer">
            <div className="todayContent">

                <div className="currentTime">
                    {localData && <div className="data">{`${monthWord} ${day()}, ${time}`}</div>}          

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
