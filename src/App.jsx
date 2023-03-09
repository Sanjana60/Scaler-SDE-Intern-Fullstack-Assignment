import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Searchbar from './Components/Searchbar/Searchbar'


function App() {

  return (
    <>
      <div className="LeftSide">
        <Navbar/>
        <Searchbar/>
      </div>
    </>
  )
}

export default App
