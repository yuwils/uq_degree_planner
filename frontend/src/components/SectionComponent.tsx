import { useState, useEffect } from 'react'
import { Section } from '../types/types'
import SectionCourseComponent from './SectionCourseComponent'
import OptionedCourseComponent from './OptionedCourseComponent'
import './styles/Section.css'

type SectionProps = {
    dcode: string;
    mcode: string;
    section: Section;
}
const SectionComponent = (props : SectionProps) => {
  const [minString, setMinString] = useState('')
  const [clicked, setClicked] = useState(false)

  const wasClicked = () => {
    setClicked(!clicked)
  }

  useEffect(() => {
    setMinString(props.section.min === props.section.max
      ? 'Take ' + props.section.min + ' units from this section.'
      : 'Take ' + props.section.min + ' to ' + props.section.max + ' units from this section.')
  }, [])

  if (clicked) {
    return (
            <div className = "section">
                <button onClick = {wasClicked} className = "sectionDetails">
                    <span className = "">
                        {props.section.name}
                    </span>
                    <span className = "triangle"> </span>
                </button>
                <div className = "courseNumber">
                    {minString}
                </div>
                <div className = "courseNumber">
                    Current Units: {props.section.currentUnits}
                </div>
                {props.section.sectionCodesWithoutOptions.map((sectionCode) => <SectionCourseComponent key={sectionCode.course.code} course={sectionCode.course} />)}
                {props.section.sectionCodesWithOptions.map((sectionCode) => <OptionedCourseComponent key={
                  sectionCode.courses.map(course => course.code).join('+')} courses={sectionCode.courses} />)}
            </div>
    )
  } else {
    return (
            <div className = "section">
            <button onClick = {wasClicked} className = "sectionDetails">
                <span className = "">
                    {props.section.name}
                </span>
                <span className = "triangle"> </span>
            </button>
        </div>
    )
  }
}

export default SectionComponent
