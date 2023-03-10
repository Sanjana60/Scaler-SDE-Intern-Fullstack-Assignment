import React from 'react'
import './Navbar.css'
import CircularIcon from '../../assets/CircularIcon.jpeg'; 

function Navbar() {  
  return (
    <>
        <div className="row">
            <div className="row_left">
                <h3>Hotel</h3>
                <p>Rent</p>
                <p>Buy</p>
            </div>
            <div className="row_right">
                <img src={CircularIcon} />
            </div>
        </div>
        
    </>
    
  )
}

export default Navbar