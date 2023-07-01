import React from 'react';
import './Navbar.css';


function Navbar(props) {
  return (
    <div className='navbarContainer'>
        <div className="searchBar">
        <input 
          type="text"
          placeholder='City...'          
          />
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
