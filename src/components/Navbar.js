import React, { useState} from 'react';
import './Navbar.css';
import { MagnifyingGlass } from "phosphor-react";
import axios from 'axios';



function Navbar(props) {

    const [cities, setCities] = useState([]);
    const searchCity = (city) => {
        
        props.setLocation(city);
        if(!city) return;
        axios.get(`http://api.weatherapi.com/v1/search.json?key=d27e5f3580d34ff991c55923232906&q=${city}`)
        .then((response) => {
            console.log("response about the city", response.data);
            if(response.data.length > 0) {
                setCities(response.data)
            }
        })
    }
    return (
        <div className='navbarContainer'>
            <div className="searchContainer">
                <input
                className="search"
                    type="text"                    
                    placeholder='City...'
                    // value={props.location}     
                    onChange={(event) => searchCity(event.target.value)}
                    onKeyDown={(event) => {
                        event.key === "Enter" && props.getWeather();
                    }}
                />
                <div onClick={props.getWeather} className="searchIcon" ><MagnifyingGlass /></div>

            </div>

            <div className="dropdownContainer">{cities.map((el) => {
                return(
                    <div className="dropdownCities">
                        <div>{`${el.name}, ${el.region}, ${el.country}`}</div>                        
                    </div>
                )
            })} </div>

            <div className="menu">
                <div onClick={() => props.setCurrentComponent("Today")}> Today </div>
                <div onClick={() => props.setCurrentComponent("Tomorrow")}> Tomorrow </div>
                <div onClick={() => props.setCurrentComponent("3 Days")}> 3 Days </div>
            </div>

        </div>
    )
}

export default Navbar;
