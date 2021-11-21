import { useState } from 'react'
import { SemesterType, Course } from '../types/types'
import TimetableCourseComponent from './TimetableCourseComponent'
import { useAppDispatch } from '../hooks/hooks'
import { addCourseToSemester, removeCourseFromSections } from '../reducers/reducers'
import './styles/Semester.css'

type SemesterComponentProps = {
    yearId: number
    sem: SemesterType
    courses: Course[]
}

const Semester = (props : SemesterComponentProps) => {
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMesssage] = useState('')
  const [currentClassName, setCurrentClassName] = useState('entireSemesterNotHover')

  const onDragExit = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentClassName('entireSemesterNotHover')
  }

  const onDragOver = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentClassName !== 'entireSemesterHover') {
      setCurrentClassName('entireSemesterHover')
    }
  }

  const onDragEnter = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentClassName('entireSemesterHover')
  }

  const onDrop = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentClassName('entireSemesterNotHover')
    if (!e.dataTransfer || e.dataTransfer.getData('code') === '' ||
      e.dataTransfer.getData('dcode') === '' ||
      e.dataTransfer.getData('mcode') === '' ||
      e.dataTransfer.getData('name') === '' ||
      e.dataTransfer.getData('title') === '' ||
      isNaN(parseInt(e.dataTransfer.getData('units')))) {
      return
    }
    if (e.dataTransfer.getData('sem1') === 'true' || e.dataTransfer.getData('sem2') === 'true' || e.dataTransfer.getData('sum') === 'true') {
      if ((props.sem === SemesterType.SemOne && e.dataTransfer.getData('sem1') !== 'true') ||
            (props.sem === SemesterType.SemTwo && e.dataTransfer.getData('sem2') !== 'true') ||
            (props.sem === SemesterType.SumSem && e.dataTransfer.getData('sum') !== 'true')) {
        setErrorMesssage(e.dataTransfer.getData('code') + ' cannot be taken in ' + props.sem)
        setTimeout(() => {
          setErrorMesssage('')
        }, 1500)
        return
      }
    }
    const newCourse : Course = {
      code: e.dataTransfer.getData('code'),
      dcode: e.dataTransfer.getData('dcode'),
      mcode: e.dataTransfer.getData('mcode'),
      name: e.dataTransfer.getData('name'),
      title: e.dataTransfer.getData('title'),
      units: parseInt(e.dataTransfer.getData('units')),
      sem1: e.dataTransfer.getData('sem1') === 'true',
      sem2: e.dataTransfer.getData('sem2') === 'true',
      sum: e.dataTransfer.getData('sum') === 'true',
      prereq: e.dataTransfer.getData('prereq'),
      incomp: e.dataTransfer.getData('incomp')
    }
    dispatch(addCourseToSemester({ yearId: props.yearId, semester: props.sem, course: newCourse }))
    dispatch(removeCourseFromSections(newCourse))
  }

  return (
        <div onDragEnter = {(e) => onDragEnter(e)} onDragLeave = {(e) => onDragExit(e)} onDragExit = {(e) => onDragExit(e)}
            onDragOver = {(e) => onDragOver(e)} onDrop = {(e) => onDrop(e)}>
            <div className = "semester">
                {props.sem}
            </div>
            <div className = {currentClassName}>
                <div>
                    {props.courses.map((course : Course) => <TimetableCourseComponent key={course.code} course={course} yearId={props.yearId} semester={props.sem}/>)}
                </div>
                <div className = "buffer">
                    <div className = "errorMessage">
                        {errorMessage}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Semester
