import React from 'react'
import './Searchbar.css'
import { AiOutlineSearch,AiOutlineSortDescending } from 'react-icons/ai';

import Dropdown from 'react-dropdown';

function SearchBar() {

    const options = [
        'Relevance', 'Price', 'Rating'
        ];

    const defaultOption = options[0];
    
  return (
    <>
        <div className="searchbar">
            <input placeholder="Search" style={{color:"#474747"}} />
            <AiOutlineSearch style={{paddingRight:"30px",color:"#474747"}}/>
        </div>
        <hr style={{margin:"0px 30px",border: "1px solid #999999"}}/>
        <div className="searchbar_sort">
            <p>Sort by :</p>
            <Dropdown options={options} value={defaultOption} placeholder="Relevance" />;
            <AiOutlineSortDescending size={17} style={{color:"#474747"}}/>

        </div>
        
    </>
    

  )
}

export default SearchBar