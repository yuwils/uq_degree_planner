import { useState } from 'react';
import { SemesterType, Year } from '../types/types';
import Semester from './Semester';
import './styles/Year.css';
import {addCourseBackToSection, removeYear} from '../reducers/reducers';
import { useAppDispatch } from '../hooks/hooks';

type YearComponentProps = {
    year: Year
}

const YearComponent = (props : YearComponentProps) => {
    const dispatch = useAppDispatch();
    const [clicked, setClicked] = useState(true);

    const yearClickback = () => {
        setClicked(!clicked);
    }

    const deleteYearCourses = () => {
        for (const course of props.year.sem1) {
            dispatch(addCourseBackToSection(course));
        }
        for (const course of props.year.sem2) {
            dispatch(addCourseBackToSection(course));
        }
        for (const course of props.year.sum) {
            dispatch(addCourseBackToSection(course));
        }
        dispatch(removeYear());
    }

    return (
        <div className = "year">
            <button onClick = {yearClickback} className = "yearHeadline">
                <span className = "yearHeadlineText">
                    Year {props.year.id}
                </span>
                <span className = "triangle">
                </span>
            </button>
            {clicked && <div>
            {<Semester yearId = {props.year.id} sem = {SemesterType.SemOne} courses = {props.year.sem1} />}
            {<Semester yearId = {props.year.id} sem = {SemesterType.SemTwo} courses = {props.year.sem2} />}
            {<Semester yearId = {props.year.id} sem = {SemesterType.SumSem} courses = {props.year.sum} />}
            </div>}
            {clicked && props.year.finalYear && <button className = "deleteYear" onClick = {deleteYearCourses}> </button>}
        </div>
    )
}

export default YearComponent;
