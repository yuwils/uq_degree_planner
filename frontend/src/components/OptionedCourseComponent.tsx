import SectionCourseComponent from './SectionCourseComponent'
import { Course } from '../types/types'
import './styles/OptionalCourse.css'

type OptionedCourseProps = {
    courses: Course[]
}

const OptionedCourseComponent = (props : OptionedCourseProps) => {
  return (
        <div className = "optionalCourse">
            <div>
                Pick one of the following:
            </div>
            {props.courses.map((course : Course) => <SectionCourseComponent key={course.code} course={course} />)}
        </div>
  )
}

export default OptionedCourseComponent
