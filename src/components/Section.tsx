import React, { useState, useEffect } from 'react';
import Course from './Course';
import OptionalCourse from './OptionalCourse';
import './styles/Section.css';

const Section = (props : any) => {
    const [courses, setCourses] = useState([]);
    const [minString, setMinString] = useState("");

    React.useEffect(() => {
        let newCourses : any = [];
        for (let i = 0; i < props.data.length; i++) {
            let oldData = props.data;
            if (!oldData[i].optional) {
                newCourses.push(<Course isDraggable = {true} onDrop = {props.onDrop} onDragStart = {props.onDragStart} code={oldData[i].code} title={oldData[i].title} 
                    units={oldData[i].units} sem1={oldData[i].sem1} sem2={oldData[i].sem2} sum ={oldData[i].sum}  prereq ={oldData[i].prereq} 
                   incomp ={oldData[i].incomp} dcode = {props.dcode} mcode = {props.mcode} name = {props.name} key = {oldData[i].code} />);
            } else {
                newCourses.push(<OptionalCourse onDrop = {props.onDrop} onDragStart = {props.onDragStart} data = {oldData[i]} dcode = {props.dcode}
                mcode = {props.mcode} name = {props.name} user = {props.user} optionalName = {oldData[i].name}/>);
            }
        }
        if (props.min === props.max) {
            setMinString("Take " + props.min + " units from this section.");
        } else {
            setMinString("Take " + props.min + " to " + props.max + " units from this section.");
        }
        setCourses(newCourses);
    }, [props.user]);

    return (
        <div className = "section">
            <div className = "sectionDetails"> 
                {props.name}
            </div>
            <div className = "courseNumber">
                {minString}
            </div>
            {courses}
        </div>
    )
}

export default Section;
