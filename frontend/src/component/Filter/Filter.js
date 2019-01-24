import React from 'react';
import "./Filter.css";

function Filter (){
    return(
        <div className="filter">
        <button className="orange">DATE</button>
        <button className="orange">LOCATION</button>
        <button className="orange">TYPES</button>
        <button className="orange">PRICE</button>
        <button className="orange">RATE</button>
        <button className="orange">VACCINE</button>
        </div>

    )
}

export default Filter;