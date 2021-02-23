import React, { useEffect } from 'react';
import './styles/Course.css';

const Course = (props : any) => {
    let sem1 : string, sem2 : string, sum :string;
    if (props.sem1) {
        sem1 = "Semester One "
    } else {
        sem1 = "";
    }
    if (props.sem2) {
        sem2 = "Semester Two ";
    } else {
        sem2 = "";
    }
    if (props.sum) {
        sum = "Summer Semester";
    } else {
        sum = "";
    }
    let name1 : string = "Can be studied in: " + sem1 + sem2 + sum;
    if (name1 === "Can be studied in: ") {
        name1 = "This course is not currently available";
    }
    if (props.isDraggable) {
    return (
        <div className = "course" draggable onDragStart= {(e) => props.onDragStart(e, props.code, props.title, 
            props.units, props.sem1, props.sem2, props.sum, props.prereq, props.incomp, props.dcode, props.mcode, props.name)}>
            <div>
                {props.code}
            </div>
            <div>
                {props.title}
            </div>
            <div>
                Units: {props.units}
            </div>
            <div>
                {name1}
            </div>
            <div>
                Prerequisites: {props.prereq}
            </div>
            <div>
                Incompatible: {props.incomp}
            </div>
        </div>
    )
    } else {
        return(
            <div className = "course">
                <div>
                    {props.code}
                </div>
                <div>
                    {props.title}
                </div>
                <div>
                    Units: {props.units}
                </div>
                <div>
                    {name1}
                </div>
                <div>
                    Prerequisites: {props.prereq}
                </div>
                <div>
                    Incompatible: {props.incomp}
                </div>
                <button onClick = {() => props.onClick(props.id, props.sem, props.code, props.dcode, props.mcode, props.name, props.incomp,
                    props.prereq, props.sem1, props.sem2, props.sum, props.title, props.units)} className = "cancelButton"> </button>
            </div>
        )
    }
}

export default Course;
