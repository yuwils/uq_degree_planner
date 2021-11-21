import { useRef, useState } from 'react'
import SectionCourseComponent from './SectionCourseComponent'
import { Degree, Course } from '../types/types'
import { useAppDispatch } from '../hooks/hooks'
import { setElective } from '../reducers/reducers'
import './styles/ElectiveForm.css'

type ElectiveFormProps = {
    degree: Degree;
}

const ElectiveForm = (props : ElectiveFormProps) => {
  const dispatch = useAppDispatch()
  const [electiveErrorMessage, setElectiveErrorMessage] = useState('')
  const curFormValue = useRef('')

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault()
    fetch('http://localhost:8080/courses?codes=' + curFormValue.current.toUpperCase())
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setElectiveErrorMessage('This course could not be found')
          setTimeout(() => {
            setElectiveErrorMessage('')
          }, 1000)
        } else {
          const electiveCourse : Course = {
            dcode: props.degree.code,
            mcode: 'ELECTIVE',
            name: 'ELECTIVE',
            ...data[0]
          }
          console.log(electiveCourse)
          dispatch(setElective({ dcode: props.degree.code, elective: electiveCourse }))
        }
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    curFormValue.current = event.target.value
  }

  return (
        <div>
            <div className = "electiveHeadline">
                {props.degree.name} Electives:
            </div>
            <div className = "electiveForm">
                <form onSubmit= {handleSubmission}>
                    <label>
                        <input className = "electiveForm" type = "text" name = "elective"
                        placeholder = {'Search for an elective class (e.g ECON1010)'} onChange = { handleChange }/>
                    </label>
                </form>
            </div>
            <div className = "electiveResult">
                {electiveErrorMessage}
                {props.degree.elective ? <SectionCourseComponent course= {props.degree.elective} /> : ''}
            </div>
        </div>
  )
}

export default ElectiveForm
