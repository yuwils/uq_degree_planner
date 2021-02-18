import React, { useEffect } from 'react';
import './styles/Course.css';

const Course = (props : any) => {

    return (
        <div className = "course" draggable onDragStart= {(e) => props.onDragStart(e)}>
            {props.title}
        </div>
    )
}

export default Course;
