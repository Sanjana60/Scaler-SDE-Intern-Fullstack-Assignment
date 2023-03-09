import React from 'react'
import './Searchbar.css'
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar() {
  return (
    <>
        <div className="searchbar">
            <input placeholder="Search" />
            <AiOutlineSearch style={{paddingRight:"30px"}}/>
        </div>
        <hr style={{margin:"0px 30px"}}/>
    </>
    

  )
}

export default SearchBar