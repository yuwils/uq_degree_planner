import React, { useState, useEffect } from 'react';
import Course from './Course';
import './styles/Section.css';

const Section = (props : any) => {
    const [courses, setCourses] = useState([]);

    React.useEffect(() => {
        let newCourses : any = [];
        for (let i = 0; i < props.data.length; i++) {
            let oldData = props.data;
            newCourses.push(<Course onDragStart = {props.onDragStart} code={oldData[i].code} title={oldData[i].code} units={oldData[i].units}
                sem1={oldData[i].sem1} sem2={oldData[i].sem2} sum ={oldData[i].sum}  prereq ={oldData[i].prereq} incomp ={oldData[i].incomp} />);
        }
        setCourses(newCourses);
    }, []);

    return (
        <div className = "section">
            {props.name}
            {courses}
        </div>
    )
}

export default Section;
