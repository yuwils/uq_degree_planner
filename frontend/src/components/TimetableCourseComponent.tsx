import { useState, useEffect } from 'react'
import './styles/Course.css'
import { Course, SemesterType } from '../types/types'
import { reduceDegreeUnits, addCourseBackToSection, removeCourseFromYears } from '../reducers/reducers'
import { useAppDispatch } from '../hooks/hooks'

type TimetableCourseProps = {
    course: Course;
    yearId: number;
    semester: SemesterType
}

const TimetableCourseComponent = (props : TimetableCourseProps) => {
  const dispatch = useAppDispatch()
  const [validUnits, setValidUnits] = useState('')

  useEffect(() => {
    const sem1Text = props.course.sem1 ? 'Semester One ' : ''
    const sem2Text = props.course.sem2 ? 'Semester Two ' : ''
    const sumText = props.course.sum ? 'Summer Semester' : ''
    setValidUnits(sem1Text + sem2Text + sumText ? 'Can be studied in: ' + sem1Text + sem2Text + sumText : 'This course is not currently available')
  }, [props.course])

  const onClick = (yearId : number, sem : SemesterType, course: Course) => {
    if (course.mcode === 'ELECTIVE') {
      dispatch(reduceDegreeUnits({ dcode: course.dcode, units: course.units }))
    } else {
      dispatch(addCourseBackToSection(course))
    }
    dispatch(removeCourseFromYears({ course: course, yearId: yearId, semester: sem }))
  }

  return (
        <div className = "course">
            <div>
                {props.course.code}
            </div>
            <div>
                {props.course.title}
            </div>
            <div>
                Units: {props.course.units}
            </div>
            <div>
                {validUnits}
            </div>
            <div>
                Prerequisites: {props.course.prereq}
            </div>
            <div>
                Incompatible: {props.course.incomp}
            </div>
            <button onClick = {() => onClick(props.yearId, props.semester, props.course)} className = "cancelButton"> </button>
        </div>
  )
}

export default TimetableCourseComponent
