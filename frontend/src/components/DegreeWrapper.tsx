import React from 'react';
import Section from './Section';
import MajorWrapper from './MajorWrapper';
import ElectiveForm from './ElectiveForm';
import './styles/DegreeWrapper.css'

const DegreeWrapper = (props : any) => {
    const [displayMajors, setDisplayMajors] = React.useState([]);
    const [displayMinors, setDisplayMinors] = React.useState([]);
    const [displayExtendedMajors, setDisplayExtendedMajors] = React.useState([]);
    const [displayElective, setDisplayElective] = React.useState<any>();
    const [currentUnits, setCurrentUnits] = React.useState(0);
    const [constraints, setConstraints] = React.useState<string[]>([]);

    React.useEffect(() => {
        let newMajors : any = [];
        let newMinors : any = [];
        let newExtendedMajors : any = [];
        for (let i = 0; i < props.degree.majorCodes.length; i++) {
            let major = props.degree.majorCodes[i];
            newMajors.push(<MajorWrapper dcode = {props.dcode} mcode = {major.code} 
                name = {major.name} units = {major.unit} 
                sections = {major.sections} onDragStart = {props.onDragStart}
                user = {props.user} currentUnits = {major.currentUnits}/> );
        }
        for (let i = 0; i < props.degree.minorCodes.length; i++) {
            let major = props.degree.minorCodes[i];
            newMajors.push(<MajorWrapper dcode = {props.dcode} mcode = {major.code} 
                name = {major.name} units = {major.unit} 
                sections = {major.sections} onDragStart = {props.onDragStart}
                user = {props.user} currentUnits = {major.currentUnits}/>);
        }
        for (let i = 0; i < props.degree.emajCodes.length; i++) {
            let major = props.degree.emajCodes[i];
            newMajors.push(<MajorWrapper dcode = {props.dcode} mcode = {major.code} 
                name = {major.name} units = {major.unit} 
                sections = {major.sections} onDragStart = {props.onDragStart}
                user = {props.user} currentUnits = {major.currentUnits}/>);
        }
        setDisplayElective(<ElectiveForm onDragStart = {props.onDragStart} dcode = {props.dcode} mcode = {props.mcode} electiveHandler = 
            {props.electiveHandler} user = {props.user} dName = {props.name} elective = {props.degree.elective} />);
        setDisplayMajors(newMajors);
        setDisplayMinors(newMinors);
        setDisplayExtendedMajors(newExtendedMajors);
        setCurrentUnits(props.degree.currentUnits);
        setConstraints(Object.keys(props.degree.constraints));
    }, [props.user]);

    return (
        <div>
            <div className = "degreeName">
                {props.name}
            </div>
            <div className = "degreeUnits">
                Current Units: {currentUnits} / {props.units}
            </div>
            <div className = "degreeConstraints">
                {constraints.map(text => <p> {text} </p>)}
            </div>
            <div>
                {displayMajors}
                {displayMinors}
                {displayExtendedMajors}
            </div>
            <div className = "displayElective">
                {displayElective}
            </div>
        </div>
    )
}

export default DegreeWrapper;