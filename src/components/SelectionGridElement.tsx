import React from 'react';
import "./styles/SelectionGridElement.css"

const SelectionGridElement = (props : any) => {
    return (
        <button className = "SelectionGridElement" onClick = {() => props.onClick(props.user, props.element)}> 
            <span className = "degreeName">
                {props.name} 
            </span>
        </button>
    )
}

export default SelectionGridElement;