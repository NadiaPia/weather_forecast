import React from 'react';
import './Navbar.css';
import { MagnifyingGlass } from "phosphor-react";



function Navbar(props) {
    return (
        <div className='navbarContainer'>
            <div className="searchContainer">
                <input
                className="search"
                    type="text"
                    placeholder='City...'
                    // value={props.location}                   
                    onChange={(event) => { props.setLocation(event.target.value) }}
                    onKeyDown={(event) => {
                        event.key === "Enter" && props.getWeather();
                    }}
                />
                <div onClick={props.getWeather} className="searchIcon" ><MagnifyingGlass /></div>

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
