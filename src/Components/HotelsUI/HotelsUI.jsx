import React from 'react'
import './HotelsUI.css'
import { FaBed ,FaShower,FaHome} from 'react-icons/fa';

function HotelsUI() {
    const names = ['Bruce', 'Clark', 'Diana','Bruce', 'Clark', 'Diana','Bruce', 'Clark', 'Diana']

  return (
    <div className="hotelsui">
        {
            names.map(name => <HotelCard/>)
        }
    </div>
)
}

function HotelCard(){
    return (
        <div className="hotelcard">
            <img  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="hii" />
            <h4>Kontrakan Pak</h4>
            <p>Nitikan Umbu</p>
            <h4 id='price'>&#8377; 5000</h4>
            <div className="hotelcard_icons">
                <div className="hotelcard_icons_row">
                    <FaBed style={{paddingRight:"3px",color:"#474747"}}/>
                    <p>2</p>
                </div>
                <div className="hotelcard_icons_row">
                    <FaShower style={{paddingRight:"3px",color:"#474747"}}/>
                    <p>2</p>
                </div>
                <div className="hotelcard_icons_row">
                    <FaHome style={{paddingRight:"3px",color:"#474747"}}/>
                    <p>200m<sup>2</sup></p>
                </div>
            </div>
        </div>
      )
}


export default HotelsUI 