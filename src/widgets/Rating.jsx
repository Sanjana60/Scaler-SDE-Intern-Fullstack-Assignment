import React from 'react'
import Star from "../assets/star.png"

function Rating(props) {
    return (
        <>
            <div className="star">
                {[...Array(props.rate)].map((e, i) => <div key={i}> <img src={Star} alt="" style={{filter: (!props.iscolor)?"grayscale(100%)":"grayscale(0%)",height:"10px"}}/></div>)}
            </div>
        </>
        )
}

export default Rating

