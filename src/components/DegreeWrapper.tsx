import React from 'react';
import Section from './Section';
import './styles/DegreeWrapper.css'

const DegreeWrapper = (props : any) => {
    const [displaySections, setDisplaySections] = React.useState([]);

    React.useEffect(() => {
        let newSections : any = [];
        for (let i = 0; i < props.sections.length; i++) {
            let newSection = props.sections[i];
            newSections.push(<Section dcode={newSection.dcode} mcode={newSection.mcode} name={newSection.name}
                max={newSection.max} min={newSection.min} data={newSection.courses} onDragStart = {props.onDragStart} user = {props.user}/>);
        }
        setDisplaySections(newSections);
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
                {displaySections}
            </div>
        </div>
    )
}

export default DegreeWrapper;