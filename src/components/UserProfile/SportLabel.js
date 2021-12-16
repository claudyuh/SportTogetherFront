import React from "react";
import './SportLabel.css'

const SportLabel = (props) => {
    

    return (
    <div className="main-wrapper">
        <div className={props.className} >
            <div className="circle">{props.symbol} </div>
            <div className="ribbon">{props.skillLevel}</div>
        </div>
    </div>

    )
}

export default SportLabel;