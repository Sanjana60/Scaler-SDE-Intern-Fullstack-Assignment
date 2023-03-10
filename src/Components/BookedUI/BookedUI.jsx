import React from 'react'
import { HiXMark } from "react-icons/hi2";
import { useState,useEffect } from 'react'



import './BookedUI.css'
import { FaBed ,FaShower,FaHome} from 'react-icons/fa';
import Rating from "../../widgets/Rating"
import {useSelector,useDispatch} from "react-redux";

import {typeClicked} from "../Slices/typeClickedSlice";

import { IoIosArrowBack} from 'react-icons/io';

import { collection, onSnapshot, query, updateDoc ,doc,Timestamp,deleteDoc} from 'firebase/firestore';
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
        <div className="hotelsui">{bookedlist.map((hotel,i) => <BookingHotel key={i} hotel={hotel} index={i} selected={hotel.name}/>)}</div>
    </div>
  )
}


function BookingHotel(props){

  // const [name, setname] = useState("");
  // const [room, setroom] = useState(-1);
  // const [starttime, setstarttime] = useState("");
  // const [endtime, setendtime] = useState("");
    
    const [email, setemail] = useState(props.hotel.email);
    const [room, setroom] = useState(props.hotel.roomnumber);
    const [starttime, setstarttime] = useState(props.hotel.starttime.toDate().toISOString().substring(0, 16));
    const [endtime, setendtime] = useState(props.hotel.endtime.toDate().toISOString().substring(0, 16));
    const [fillformerror, setfillformerror] = useState(false);
    const [shownewprice, setshownewprice] = useState(false);

  const [dialog, setdialog] = useState(true);
  const [dialogdel, setdialogdel] = useState(true);



  const whichTypeClicked=useSelector((state)=>state.whichTypeClicked.whichTypeClicked);
  const dispatch=useDispatch();
  const typeClick=()=>{
      dispatch(typeClicked(props.selected));
    }

    
    


    const handleChangeEmail = (event) => {
      setemail(event.target.value);
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


    const dialogopen = () => {
      setdialog(false);
      setshownewprice(true);
    };

    const dialogclose = () => {
      setdialog(true);
      setshownewprice(false);
      setfillformerror(false);
    };

    const confirm = async () => {
        setshownewprice(false);

        if(email!="" && room !="" && starttime!="" &&endtime!=""){

          setfillformerror(false);
          



          const starttimestamp = new Date(starttime).getTime();
          const endtimestamp = new Date(endtime).getTime();




          const firebaseStartTimestamp = new Timestamp(parseInt(starttimestamp/1000),0)
          const firebaseEndTimestamp = new Timestamp(parseInt(endtimestamp/1000),0)

          

          
        await updateDoc(doc(db,"BookedHotels",props.hotel.id),{

          email:email,
          roomnumber:room,
          starttime: firebaseStartTimestamp,
          endtime:firebaseEndTimestamp,
          bookedprice:props.hotel.bookedprice+20,

        })
        dialogclose();

      }
      else{
          setfillformerror(true);
      }
    };



    const dialogopendel = () => {
      setdialogdel(false);
    };

    const dialogclosedel = () => {
      setdialogdel(true);
    };

    const confirmdel = async () => {
      
      
      await deleteDoc(doc(db,"BookedHotels",props.hotel.id))
    
  };
  


  return (
      <div className="hotelbookingcard" style={{height:whichTypeClicked===props.selected?"230px":"140px"}} onClick={typeClick}>
       

       
          <div className="hotelbookingcard_column1">
              <img  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="hii" />
              
              <div className="hotelbookingcard_right">
                  <h4>{props.hotel.name}</h4>
                  <Rating rate={4} iscolor={true}/>
                  <p>{props.hotel.state}</p>
                  {/* <p style={{color:"#474747",fontWeight:"bold"}}>Rooms Available - {props.type.left}</p> */}
                  <h4 id='bookingprice' >Booked Price : &#8377; {props.hotel.bookedprice}/hr</h4>
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
              

          <div style={{display:"flex",alignItems:"start",justifyContent:"space-between"}}>
              <div>
                  <div className="hotelbookingcard_input" style={{margin:"7px 0px"}}> 
                      <input type="text" defaultValue={props.hotel.email} onChange={handleChangeEmail} placeholder='Email ID' ></input>
                      <input type="number" defaultValue={props.hotel.roomnumber} onChange={handleChangeRoom} style={{marginLeft:"10px"}} placeholder='Room Number'></input>
                  </div>  
                  <div className="hotelbookingcard_input"> 
                      <input type="datetime-local" defaultValue={props.hotel.starttime.toDate().toISOString().substring(0, 16)} onChange={handleChangeStart} placeholder='Start Time'></input>
                      <input type="datetime-local"  defaultValue={props.hotel.endtime.toDate().toISOString().substring(0,16)} onChange={handleChangeEnd} style={{marginLeft:"10px"}} placeholder='End Time'></input>
                  </div>
              </div>
              <div className={"hotelbookingcard_input"} id="hotelbookingcard_input"> 
                  
                  {(dialog)?<button onClick={dialogopen}>Edit</button>:<div style={{display:"flex"}}>
                    <button onClick={confirm} style={{marginRight:"5px"}} id="hotelbookingcard_input_confirmbutton" >Confirm</button>
                    <button onClick={dialogclose} >Cancel</button>
                  </div>}
                  {(dialogdel)?<button onClick={dialogopendel}>Delete</button>:<div style={{display:"flex"}}>
                    <button onClick={confirmdel} style={{marginRight:"5px"}} id="hotelbookingcard_input_confirmbutton" >Confirm</button>
                    <button onClick={dialogclosedel} >Cancel</button>
                  </div>}
                  {fillformerror&&<p style={{paddingBottom:"10px",color:"red"}}>Incomplete Details</p>}
                  {shownewprice&&<p style={{paddingBottom:"10px",color:"red"}}>Edit Cost &#8377; 20 </p>}

               </div>


          </div>
          </div>}
      </div>
  )
}




export default Booked 