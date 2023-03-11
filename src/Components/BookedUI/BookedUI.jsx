import React from 'react'
import { useState,useEffect } from 'react'

import Dialog from '../../widgets/Dialog';

import './BookedUI.css'
import { FaBed ,FaShower,FaHome} from 'react-icons/fa';
import Rating from "../../widgets/Rating"
import {useSelector,useDispatch} from "react-redux";

import {typeClicked} from "../Slices/typeClickedSlice";

import { IoIosArrowBack} from 'react-icons/io';

import { collection, onSnapshot, query, updateDoc ,doc} from 'firebase/firestore';
import {db} from "../../firebase"


function Booked() {

  const [bookedlist, setbookedlist] = useState([])

  useEffect(() => {
    
      const q=query(collection(db,"BookedHotels"));
      const unsubscribe=onSnapshot(q,(querySnapshot)=>{
          let bookedlist=[];
          querySnapshot.forEach((doc)=>{
            bookedlist.push({...doc.data(),id:doc.id})
          });

          setbookedlist(bookedlist)
          // console.log(hotellist[0].type)

      })
  
    return () => unsubscribe
  }, [])





  return (
    <div>
        <div className="hotelsui_backarrow">
            <IoIosArrowBack/>
            <p>Back to Home Screen</p>
        </div>
        <div className="hotelsui">{bookedlist.map((hotel,i) => <BookingHotel key={i} hotel={hotel} index={i} selected={hotel.name}/>)}</div>
    </div>
  )
}


function BookingHotel(props){

  // const [name, setname] = useState("");
  // const [room, setroom] = useState(-1);
  // const [starttime, setstarttime] = useState("");
  // const [endtime, setendtime] = useState("");
  const [fillformerror, setfillformerror] = useState(false);

  const [dialog, setdialog] = useState(false);



  const whichTypeClicked=useSelector((state)=>state.whichTypeClicked.whichTypeClicked);
  const dispatch=useDispatch();
  const typeClick=()=>{
      dispatch(typeClicked(props.selected));
    }


    const booknow= async ()=>{
      // console.log(room)
      // if(name!="" && room !="" && starttime!="" &&endtime!=""){
      //     setfillformerror(false);

      //     let type_copy = props.hotelData.type.map((element,i) => {
      //         if (i === props.index) {
      //           element.left = element.left-1;
      //         } 
      //       return element;
      //       });
      //     await updateDoc(doc(db,"HotelNames",props.hotelData.id),{
  
      //         totalavailable:props.hotelData.totalavailable-1,
      //         type:type_copy,
  
      //     })


      // }
      // else{
      //     setfillformerror(true);
      // }

      
    }

    const handleChangeName = (event) => {
      setname(event.target.value);
    };

    const handleChangeRoom = (event) => {
      setroom(event.target.value);
    };

    const handleChangeStart = (event) => {
      setstarttime((event.target.value));
    };

    const handleChangeEnd = (event) => {
      setendtime((event.target.value));
    };
    var x="aerrrr";

  return (
      <div className="hotelbookingcard" style={{height:whichTypeClicked===props.selected?"230px":"140px"}} onClick={typeClick}>
          <div className="hotelbookingcard_column1">
              <img  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="hii" />
              <div className="hotelbookingcard_right">
                  <h4>{props.hotel.name}</h4>
                  <Rating rate={4} iscolor={true}/>
                  <p>{props.hotel.state}</p>
                  {/* <p style={{color:"#474747",fontWeight:"bold"}}>Rooms Available - {props.type.left}</p> */}
                  <h4 id='bookingprice' >&#8377; {props.hotel.bookedprice}/hr</h4>
                  <div className="hotelbookingcard_icons">
                      <div className="hotelcard_icons_row">
                          <FaBed style={{paddingRight:"3px",color:"#474747"}}/>
                          <p>{props.hotel.bed}</p>
                      </div>
                      <div className="hotelbookingcard_icons_row">
                          <FaShower style={{paddingRight:"3px",color:"#474747"}}/>
                          <p>{props.hotel.shower}</p>
                      </div>
                      <div className="hotelbookingcard_icons_row">
                          <FaHome style={{paddingRight:"3px",color:"#474747"}}/>
                          <p>{props.hotel.size}m<sup>2</sup></p>
                      </div>
                  </div>

              </div>
          </div>

          {(whichTypeClicked===props.selected)&&<div>

              <h4>Details</h4>

          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                  <div className="hotelbookingcard_input" style={{margin:"7px 0px"}}> 
                      <input type="text" value={props.hotel.email} onChange={handleChangeName} placeholder='Email ID' ></input>
                      <input type="number" value={props.hotel.roomnumber} onChange={handleChangeRoom} style={{marginLeft:"10px"}} placeholder='Room Number'></input>
                  </div>
                  <div className="hotelbookingcard_input"> 
                      <input type="time" onChange={handleChangeStart} placeholder='Start Time'></input>
                      <input type="time" onChange={handleChangeEnd} style={{marginLeft:"10px"}} placeholder='End Time'></input>
                  </div>
              </div>

              <div className={"hotelbookingcard_input"} id="hotelbookingcard_input"> 
                  {fillformerror&&<p style={{paddingBottom:"10px",color:"red"}}>Incomplete Details</p>}
                  <button onClick={()=>{setdialog(true)}} >Edit</button>
                  <button  >Delete</button>
                  
                  
               </div>


          </div>
          </div>}
          <Dialog isOpen={dialog} onClose={(e) =>{setdialog(false)}}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste a ipsam repellendus commodi ad, fugit id magnam inventore laudantium autem delectus praesentium incidunt debitis, numquam dicta eveniet obcaecati, itaque quidem?
                  </Dialog>
      </div>
  )
}


export default Booked 