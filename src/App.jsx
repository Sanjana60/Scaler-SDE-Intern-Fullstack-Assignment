import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Searchbar from './Components/Searchbar/Searchbar'
import HotelsUI from './Components/HotelsUI/HotelsUI'


function App() {

  return (
    <>
      <div className="LeftSide">
        <Navbar/>
        <Searchbar/>
        <HotelsUI/>

      </div>
    </>
  )
}

export default App
