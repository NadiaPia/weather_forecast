import React, { useState} from 'react';
import './Navbar.css';
import { MagnifyingGlass } from "phosphor-react";
import axios from 'axios';



function Navbar(props) {

    const [cities, setCities] = useState([]);

    const searchWeather = () => {
        props.getWeather();
        document.getElementById("input").blur(); //unfocus the input after enter or clicking of the MagnifyingGlass

    }

    const countryShorts = {
        "United Arab Emirates": "UAE",
        "United Kingdom": "UK",
        "United States of America": "USA",
        "Соединенные Штаты Америки": "США",
    }
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
            <div className="searchContainer" >
                <input
                id="input"
                className="search"
                    type="text"                    
                    placeholder='City...'  
                    onClick={() => props.setData(null)}                  
                    // value={props.location}     
                    onChange={(event) => searchCity(event.target.value)}
                    onKeyDown={(event) => {
                        event.key === "Enter" && searchWeather();
                       
                    }}
                />
                <div onClick={searchWeather} className="searchIcon" ><MagnifyingGlass /></div>

            </div>

            <div className={props.hide? "dropdownContainerHidden" : "dropdownContainer"}>
                <div className="dropdownCities">
                {cities.map((el, key) => {
                    const country = countryShorts[el.country]? countryShorts[el.country] : el.country;                    
                    // const country = countryShorts[el.country] || el.country;        //the same but short         

                return(
                         <div className="dropdownCity" key={`search-city-${key}`}>{`${el.name}, ${el.region}, ${country}`}</div>
                       
                        )
                    })} </div>
                </div>

            <div className="menu">
                <div onClick={() => props.setCurrentComponent("Today")}> Today </div>
                <div onClick={() => props.setCurrentComponent("Tomorrow")}> Tomorrow </div>
                <div onClick={() => props.setCurrentComponent("3 Days")}> 3 Days </div>
            </div>

        </div>
    )
}

export default Navbar;
