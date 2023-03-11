import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Searchbar from './Components/Searchbar/Searchbar'
import HotelsUI from './Components/HotelsUI/HotelsUI'
import BookedUI from './Components/BookedUI/BookedUI'
import CircularIcon from "./assets/CircularIcon.jpeg"


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {

  return (
    <>
      <Router>
          <div className="LeftSide">
            <div className="row">
              <div className="row_left">
                  <Link to="/" style={{textDecoration:"none"}}><h3>Hotel</h3></Link>
                  <Link to="/booked" style={{textDecoration:"none"}}><p>Booked</p></Link>
              </div>
              <div className="row_right">
                  <img src={CircularIcon} />
              </div>
            </div>
            <Searchbar/>
            <Routes>
            <Route path="/" element={<Hotel />} />
            <Route path="/booked" element={<Booked />} />
          </Routes>
          </div>
      </Router>
     
    </>
  )
}


function Hotel() {

  return (
    <>
        <HotelsUI/>
    </>
  )
}

function Booked() {

  return (
    <>
        <BookedUI/>
    </>
  )
}



export default App
