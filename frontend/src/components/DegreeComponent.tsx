import { Degree, DegreeConstraint, Major } from '../types/Types';
import MajorComponent from './MajorComponent';
import ElectiveForm from './ElectiveForm';
import './styles/DegreeWrapper.css'

type DegreeComponentProps = {
    degree: Degree;
}

const DegreeComponent = (props : DegreeComponentProps) => {
    return (
        <div>
            <div className = "degreeName">
                {props.degree.name}
            </div>
            <div className = "degreeUnits">
                Current Units: {props.degree.currentUnits} / {props.degree.units}
            </div>
            <div className = "degreeConstraints">
                {props.degree.constraints.map((constraint: DegreeConstraint) => <p key={constraint.constraint}> {constraint.constraint} </p>)}
            </div>
            <div>
                {props.degree.majorCodes.map((major: Major) => <MajorComponent key = {major.mcode} dcode={props.degree.code} major={major}/>)}
                {props.degree.minorCodes.map((minor: Major) => <MajorComponent key = {minor.mcode} dcode={props.degree.code} major={minor}/>)}
                {props.degree.extendedMajorCodes.map((extendedMajor: Major) => <MajorComponent key = {extendedMajor.mcode} dcode={props.degree.code} major={extendedMajor}/>)}
            </div>
            <div className = "displayElective">
                <ElectiveForm degree = {props.degree}/>)
            </div>
        </div>
    )
}

export default DegreeComponent;