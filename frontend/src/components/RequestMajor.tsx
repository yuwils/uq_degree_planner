import { useState, useEffect } from 'react'
import { Page, MajorType, Major, MajorAPI } from '../types/types'
import DropDownMenu from './DropDownMenu'
import SelectionGridElement from './SelectionGridElement'
import { selectLastDegree, addMajor, changePage } from '../reducers/reducers'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import './styles/RequestMajor.css'

const RequestMajor = () => {
  const dispatch = useAppDispatch()
  const userDegree = useAppSelector(selectLastDegree)

  const [majors, setMajors] = useState<Major[]>([])
  const [minors, setMinors] = useState<Major[]>([])
  const [extendedMajors, setExtendedMajors] = useState<Major[]>([])

  const [selectedMajors, setSelectedMajors] = useState<Major[]>([])
  const [selectedMinors, setSelectedMinors] = useState<Major[]>([])
  const [selectedExtendedMajors, setSelectedExtendedMajors] = useState<Major[]>([])

  const getMajors = () => {
    fetch('http://localhost:8080/majors?dcode=' + userDegree?.code.toString()).then(
      response => response.json()).then(data => {
      const majors : Major[] = []
      const minors : Major[] = []
      const extendedMajors : Major[] = []
      data.forEach((x : MajorAPI) => {
        const major: Major = {
          mcode: x.mcode,
          type: x.type,
          name: x.name,
          units: x.units,
          sections: [],
          currentUnits: 0
        }
        if (major.type === MajorType.Major) {
          majors.push(major)
        } else if (major.type === MajorType.Minor) {
          minors.push(major)
        } else if (major.type === MajorType.ExtendedMajor) {
          extendedMajors.push(major)
        }
      })
      setMajors(majors)
      setMinors(minors)
      setExtendedMajors(extendedMajors)
    })
  }

  useEffect(() => {
    getMajors()
  }, [])

  const dropDownCallback = (major: Major, prevMajorCode : string) => {
    if (major.type === MajorType.Major && !selectedMajors.some(existingMajor => existingMajor.mcode === major.mcode)) {
      setSelectedMajors(selectedMajors.filter(major => major.mcode !== prevMajorCode).concat([major]))
    } else if (major.type === MajorType.Minor && !selectedMinors.some(existingMajor => existingMajor.mcode === major.mcode)) {
      setSelectedMinors(selectedMinors.filter(minor => minor.mcode !== prevMajorCode).concat([major]))
    } else if (major.type === MajorType.ExtendedMajor && !selectedExtendedMajors.some(existingMajor => existingMajor.mcode === major.mcode)) {
      setSelectedExtendedMajors(selectedExtendedMajors.filter(extendedMajor => extendedMajor.mcode !== prevMajorCode).concat([major]))
    } else {
      return false
    }
    return true
  }

  const generateDropDowns = (elements: Major[], type: MajorType, optionNumber: number | undefined) => {
    const dropdowns: JSX.Element[] = []
    if (optionNumber) {
      for (let i = 0; i < optionNumber; i++) {
        dropdowns.push(<DropDownMenu key={i} callback = {dropDownCallback}
                    majorTypeName = {type.toLowerCase().split('_').map(x => x[0].toUpperCase() + x.slice(1)).join(' ')} elements = {elements} />)
      }
    }
    return dropdowns
  }

  return (
        <div className = "buttonGrid">
            <div className = "buttonGridWrapper">
                {generateDropDowns(majors, MajorType.Major, userDegree?.degreeOption?.majors)}
                {generateDropDowns(minors, MajorType.Minor, userDegree?.degreeOption?.minors)}
                {generateDropDowns(extendedMajors, MajorType.ExtendedMajor, userDegree?.degreeOption?.extendedMajors)}
                <SelectionGridElement className = "majorSelection" onClick = {() => {
                  if (selectedMinors.length === userDegree?.degreeOption?.minors &&
                        selectedMajors.length === userDegree?.degreeOption?.majors &&
                        selectedExtendedMajors.length === userDegree?.degreeOption?.extendedMajors) {
                    for (const major of selectedMajors) {
                      dispatch(addMajor({ unshift: false, major: major }))
                    }
                    for (const major of selectedMinors) {
                      dispatch(addMajor({ unshift: false, major: major }))
                    }
                    for (const major of selectedExtendedMajors) {
                      dispatch(addMajor({ unshift: false, major: major }))
                    }
                    dispatch(changePage(Page.RequestNewDegree))
                  }
                } } name = {'Continue'}/>
            </div>
        </div>
  )
}

export default RequestMajor
