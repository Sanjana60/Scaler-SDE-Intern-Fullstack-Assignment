import React from 'react'
import Star from "../assets/star.png"

function Rating(props) {
    return (
        <>
            <div className="star">
                {[...Array(props.rate)].map((e, i) => <div key={i}> <img src={Star} alt="" style={{height:"10px"}}/></div>)}
            </div>
        </>
        )
}

export default Rating

