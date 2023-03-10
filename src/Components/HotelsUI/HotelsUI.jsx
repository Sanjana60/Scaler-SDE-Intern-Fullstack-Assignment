import React from 'react'
import './HotelsUI.css'
import { useState,useEffect } from 'react'
import { FaBed ,FaShower,FaHome} from 'react-icons/fa';
import { IoIosArrowBack} from 'react-icons/io';
import Rating from "../../widgets/Rating"
import {useSelector,useDispatch} from "react-redux";
import {typeClicked} from "../Slices/typeClickedSlice";
import { collection, onSnapshot, query, updateDoc ,doc} from 'firebase/firestore';
import {db} from "../../firebase"

function HotelsUI() {
    const names = ['Bruce', 'Clark', 'Diana','Bruce', 'Clark', 'Diana','Bruce', 'Clark', 'Diana']

    const [hotellist, sethotellist] = useState([])
    const types = ['Type A', 'Type B', 'Type C']
    const [showHotelBooking, setshowHotelBooking] = useState(false);
    const [hotelselected, sethotelselected] = useState(-1);

    useEffect(() => {
      
        const q=query(collection(db,"HotelNames"));
        const unsubscribe=onSnapshot(q,(querySnapshot)=>{
            let hotellist=[];
            querySnapshot.forEach((doc)=>{
                // console.log("doc");
                hotellist.push({...doc.data(),id:doc.id})
            });

            sethotellist(hotellist)
            // console.log(hotellist[0].type)

        })
    
      return () => unsubscribe
    }, [])

  
    const showHotelBook = (i) => {
        setshowHotelBooking(true);
        sethotelselected(i)

    };

    const dontshowHotelBook = () => {
        setshowHotelBooking(false);
    };


  return (
    <>
        {
            (!showHotelBooking)
            ? <div className="hotelsui">{hotellist.map((hotel,i) => <HotelCard key={i} handleClick={()=>{showHotelBook(i)}} hotel={hotel}/>)}</div>
            : <div>
                <div onClick={dontshowHotelBook} className="hotelsui_backarrow">
                    <IoIosArrowBack/>
                    <p>Back to Home Screen</p>
                </div>
                <div className="hotelsui">{hotellist[hotelselected].type.map((type,i) => <BookingHotel key={i} hotelData={hotellist[hotelselected]} index={i} selected={type.name} type={type}/>)}</div>
            </div>
        }
    </>

    
    
)
}


function HotelCard({handleClick,hotel}){
    return (
        <div className="hotelcard" onClick={handleClick}>
            <img  src={hotel.img} alt="hii" />
            <h4>{hotel.name}</h4>
            <p>{hotel.state}</p>
            <p style={{color:"#474747",fontWeight:"bold"}}>Rooms Available - {hotel.totalavailable}</p>
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






function BookingHotel(props){



    const whichTypeClicked=useSelector((state)=>state.whichTypeClicked.whichTypeClicked);

    const dispatch=useDispatch();


    const typeClick=()=>{
        dispatch(typeClicked(props.selected));
      }


      const booknow= async ()=>{

        let type_copy = props.hotelData.type.map((element,i) => {
            if (i === props.index) {
              element.left = element.left-1;
            } 
          return element;
          });



        await updateDoc(doc(db,"HotelNames",props.hotelData.id),{

            totalavailable:props.hotelData.totalavailable-1,
            type:type_copy,

        })
      }


    return (
        <div className="hotelbookingcard" style={{height:whichTypeClicked===props.selected?"230px":"140px"}} onClick={typeClick}>
            <div className="hotelbookingcard_column1">
                <img  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="hii" style={{filter: (props.type.left===0)?"grayscale(100%)":"grayscale(0%)"}} />
                <div className="hotelbookingcard_right">
                    <h4>{props.type.name}</h4>
                    <Rating rate={4} iscolor={(props.type.left==0)?false:true}/>
                    <p>{props.hotelData.state}</p>
                    <p style={{color:"#474747",fontWeight:"bold"}}>Rooms Available - {props.type.left}</p>
                    <h4 id='bookingprice' style={{filter: (props.type.left===0)?"grayscale(100%)":"grayscale(0%)"}}>&#8377; {props.type.price}/hr</h4>
                    <div className="hotelbookingcard_icons">
                        <div className="hotelcard_icons_row">
                            <FaBed style={{paddingRight:"3px",color:"#474747"}}/>
                            <p>{props.type.bed}</p>
                        </div>
                        <div className="hotelbookingcard_icons_row">
                            <FaShower style={{paddingRight:"3px",color:"#474747"}}/>
                            <p>{props.type.shower}</p>
                        </div>
                        <div className="hotelbookingcard_icons_row">
                            <FaHome style={{paddingRight:"3px",color:"#474747"}}/>
                            <p>{props.type.size}m<sup>2</sup></p>
                        </div>
                    </div>

                </div>
            </div>

            {(whichTypeClicked===props.selected)&&<div>

                <h4>Details</h4>

            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                    <div className="hotelbookingcard_input" style={{margin:"7px 0px"}}> 
                        <input type="text" placeholder='Email ID'></input>
                        <input type="number" style={{marginLeft:"10px"}} placeholder='Room Number'></input>
                    </div>
                    <div className="hotelbookingcard_input"> 
                        <input type="text" placeholder='Start Time'></input>
                        <input type="number" style={{marginLeft:"10px"}} placeholder='End Time'></input>
                    </div>
                </div>

                <div className={props.type.left===0?"hotelbookingcard_input_black":"hotelbookingcard_input"}> 
                    <button onClick={(props.type.left===0)?()=>{}:booknow} >Book Now</button>
                 </div>


            </div>
            

            
            
            </div>}
            




            
            


            
            
        </div>
    )
}


export default HotelsUI 