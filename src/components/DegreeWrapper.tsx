import React from 'react';
import Section from './Section';
import MajorWrapper from './MajorWrapper';
import './styles/DegreeWrapper.css'

const DegreeWrapper = (props : any) => {
    const [displayMajors, setDisplayMajors] = React.useState([]);
    const [displayMinors, setDisplayMinors] = React.useState([]);
    const [displayExtendedMajors, setDisplayExtendedMajors] = React.useState([]);

    React.useEffect(() => {
        let newMajors : any = [];
        let newMinors : any = [];
        let newExtendedMajors : any = [];
        console.log("major");
        console.log(props);
        for (let i = 0; i < props.degree.majorCodes.length; i++) {
            let major = props.degree.majorCodes[i];
            newMajors.push(<MajorWrapper dcode = {props.dcode} mcode = {major.code} 
                name = {major.name} units = {major.unit} 
                sections = {major.sections} onDragStart = {props.onDragStart}
                user = {props.user}/>);
        }
        for (let i = 0; i < props.degree.minorCodes.length; i++) {

        }
        for (let i = 0; i < props.degree.emajCodes.length; i++) {

        }
        setDisplayMajors(newMajors);
        setDisplayMinors(newMinors);
        setDisplayExtendedMajors(newExtendedMajors);
    }, [props.user]);

    return (
        <div>
            <div className = "degreeName">
                {props.name}
            </div>
            <div className = "degreeUnits">
                Units: {props.units}
            </div>
            <div>
                {displayMajors}
                {displayMinors}
                {displayExtendedMajors}
            </div>
        </div>
    )
}

export default DegreeWrapper;