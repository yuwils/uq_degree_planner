import React, { useEffect } from 'react';
import './styles/ResetBox.css';

const ResetBox = (props : any) => {
    return (
        <div className = "resetBox">
            <p>
                Are you sure you want to reset your plan? Your current plan will not be recoverable if it is reset.
            </p>
            <button className = "resetBoxButton" onClick = {() => props.handler(true)}>
                Yes
            </button>
            <button className = "resetBoxButton"  onClick = {() => props.handler(false)}>
                No
            </button>
        </div>
    )
}

export default ResetBox;