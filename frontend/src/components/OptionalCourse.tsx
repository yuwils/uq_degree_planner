import React, { useEffect } from 'react';
import Course from './Course';
import './styles/OptionalCourse.css';

const OptionalCourse = (props : any) => {
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        let newCourses : any = [];
        for (let i = 0; i < props.data.course.length; i++) {
            let newCourse = props.data.course[i];
            newCourses.push(<Course isDraggable = {true} onDrop = {props.onDrop} onDragStart = {props.onDragStart} code={newCourse.code} title={newCourse.title} 
                units={newCourse.units} sem1={newCourse.sem1} sem2={newCourse.sem2} sum ={newCourse.sum}  prereq ={newCourse.prereq} 
            incomp ={newCourse.incomp} dcode = {props.dcode} mcode = {props.mcode} name = {props.name} key = {newCourse.code} />);
        }
        setCourses(newCourses);
    }, [props.user]);

    return (
        <div className = "optionalCourse">
            <div>
                Pick one of the following:
            </div>
            {courses}
        </div>
    )
}

export default OptionalCourse;