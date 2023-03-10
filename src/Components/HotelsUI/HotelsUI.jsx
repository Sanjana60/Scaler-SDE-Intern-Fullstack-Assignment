import React from 'react'
import './HotelsUI.css'
import { useState } from 'react'
import { FaBed ,FaShower,FaHome} from 'react-icons/fa';
import Rating from "../../widgets/Rating"

function HotelsUI() {
    const names = ['Bruce', 'Clark', 'Diana','Bruce', 'Clark', 'Diana','Bruce', 'Clark', 'Diana']
    const names2 = ['Bruce', 'Clark', 'Diana']
    const [showHotelBooking, setshowHotelBooking] = useState(false);

  
  
    const showHotelBook = () => {
        setshowHotelBooking(true);
    };

    const dontshowHotelBook = () => {
        setshowHotelBooking(false);
    };


  return (
    <>
        {
            (!showHotelBooking)
            ? <div className="hotelsui">{names.map((name,i) => <HotelCard key={i} handleClick={showHotelBook}/>)}</div>
            : <div className="hotelsui">{names2.map((name,i) => <BookingHotel key={i} handleClick={dontshowHotelBook}/>)}</div>
            // : <div className="hotelsui"><BookingHotel handleClick={dontshowHotelBook}/></div>
        }
    </>

    
    
)
}


function HotelCard({handleClick}){
    return (
        <div className="hotelcard" onClick={handleClick}>
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






function BookingHotel({handleClick}){
    return (
        <div className="hotelbookingcard" onClick={handleClick}>
            <img  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="hii" />

            <div className="hotelbookingcard_right">
                <h4>Type A</h4>
                <Rating rate={4}/>
                <p>Nitikan Umbu</p>
                <h4 id='bookingprice'>&#8377; 5000</h4>
                <div className="hotelbookingcard_icons">
                    <div className="hotelcard_icons_row">
                        <FaBed style={{paddingRight:"3px",color:"#474747"}}/>
                        <p>2</p>
                    </div>
                    <div className="hotelbookingcard_icons_row">
                        <FaShower style={{paddingRight:"3px",color:"#474747"}}/>
                        <p>2</p>
                    </div>
                    <div className="hotelbookingcard_icons_row">
                        <FaHome style={{paddingRight:"3px",color:"#474747"}}/>
                        <p>200m<sup>2</sup></p>
                    </div>
                </div>

            </div>
            
            
            
        </div>
    )
}


export default HotelsUI 