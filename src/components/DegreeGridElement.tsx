import React, { ReactPropTypes } from 'react';
import "./styles/DegreeGridElement.css"

const DegreeGridElement = (props : any) => {
    return (
        <button className = "DegreeGridElement" onClick = {props.onClick}> 
            <span className = "degreeName">
                {props.name} 
            </span>
            <span className = "year">
                Year:{props.year} 
            </span>
        </button>
    )
}

export default DegreeGridElement;