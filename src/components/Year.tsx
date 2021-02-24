import React, { useState, useEffect } from 'react';
import Semester from './Semester';
import './styles/Year.css';

const Year = (props : any) => {
    if (!props.finalYear) {
        return (
            <div className = "year">
                <div className = "yearHeadline">
                    Year {props.id}
                </div>
                <div>
                <Semester onClick = {props.onClick} user = {props.user} id = {props.id} sem = "Semester One" 
                    classes = {props.sem1} onDragOver = {props.onDragOver} onDrop = {props.onDrop}/>
                <Semester onClick = {props.onClick} user = {props.user} id = {props.id} sem = "Semester Two" 
                    classes = {props.sem2} onDragOver = {props.onDragOver} onDrop = {props.onDrop}/>
                <Semester onClick = {props.onClick} user = {props.user} id = {props.id} sem = "Summer Semester" 
                    classes = {props.sum} onDragOver = {props.onDragOver} onDrop = {props.onDrop}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className = "year">
                <div className = "yearHeadline">
                    Year {props.id}
                </div>
                <div>
                <Semester onClick = {props.onClick} user = {props.user} id = {props.id} sem = "Semester One" 
                    classes = {props.sem1} onDragOver = {props.onDragOver} onDrop = {props.onDrop}/>
                <Semester onClick = {props.onClick} user = {props.user} id = {props.id} sem = "Semester Two" 
                    classes = {props.sem2} onDragOver = {props.onDragOver} onDrop = {props.onDrop}/>
                <Semester onClick = {props.onClick} user = {props.user} id = {props.id} sem = "Summer Semester" 
                    classes = {props.sum} onDragOver = {props.onDragOver} onDrop = {props.onDrop}/>
                </div>
                <button className = "deleteYear" onClick = {props.deleteYear}> </button>
            </div>
        )
    }
}

export default Year;
