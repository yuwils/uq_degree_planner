import React from 'react';

const ResetButton = (callback: any) => {
    return (
    <button className = "resetButton" onClick = {callback}>Reset your plan</button>
    )
}

export default ResetButton;