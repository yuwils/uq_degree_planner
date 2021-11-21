import { useState, useEffect } from 'react'
import './styles/Course.css'
import { Course } from '../types/types'

type SectionCourseProps = {
    course: Course;
}

const SectionCourseComponent = (props : SectionCourseProps) => {
  const [validUnits, setValidUnits] = useState('')

  useEffect(() => {
    const sem1Text = props.course.sem1 ? 'Semester One ' : ''
    const sem2Text = props.course.sem2 ? 'Semester Two ' : ''
    const sumText = props.course.sum ? 'Summer Semester' : ''
    setValidUnits(sem1Text + sem2Text + sumText ? 'Can be studied in: ' + sem1Text + sem2Text + sumText : 'This course is not currently available')
  }, [props.course])

  const onDragStart = (e : React.DragEvent<HTMLDivElement>, course: Course) => {
    e.dataTransfer.setData('code', course.code)
    e.dataTransfer.setData('title', course.title)
    e.dataTransfer.setData('units', course.units.toString())
    e.dataTransfer.setData('sem1', course.sem1.toString())
    e.dataTransfer.setData('sem2', course.sem2.toString())
    e.dataTransfer.setData('sum', course.sum.toString())
    e.dataTransfer.setData('prereq', course.prereq)
    e.dataTransfer.setData('incomp', course.incomp)
    e.dataTransfer.setData('dcode', course.dcode)
    e.dataTransfer.setData('mcode', course.mcode)
    e.dataTransfer.setData('name', course.name)
  }

  return (
        <div className = "course" id = {'draggableCourse'} draggable onDragStart= {(e) => onDragStart(e, props.course)}>
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
        </div>
  )
}

export default SectionCourseComponent
