import React from 'react';
import SelectionGridElement from "./SelectionGridElement";
import './styles/RequestNewDegree.css';

const RequestNewDegree = (props : any) => {
    return (
        <div>
            <div>
                <div className = "requestHeadline">
                    Select another degree?
                </div>
                <div className = "requestExplain"> 
                    This option is intended for degree structures such as diplomas, Education and dual degrees in which different degrees are studied concurrently. 
                </div>
            </div>
            <div className = "requestButtons">
                <SelectionGridElement className = "degreeSelection" user = {props.user} onClick = { props.handler } 
                name = "Yes" element = {true} />
                <SelectionGridElement className = "degreeSelection" user = {props.user} onClick = { props.handler } 
                name = "No" element = {false} />
            </div>
        </div>
    )
}

export default RequestNewDegree;