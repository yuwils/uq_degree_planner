import React from 'react';
import Section from './Section';
import './styles/MajorWrapper.css'

const MajorWrapper = (props : any) => {
    const [displaySections, setDisplaySections] = React.useState([]);
    const [currentUnits, setCurrentUnits] = React.useState(0);

    React.useEffect(() => {
        let newSections : any = [];
        for (let i = 0; i < props.sections.length; i++) {
            let newSection = props.sections[i];
            newSections.push(<Section dcode={props.dcode} mcode={props.mcode} name={newSection.name}
            max={newSection.max} min={newSection.min} data={newSection.courses} onDragStart = {props.onDragStart} user = {props.user}
            currentUnits = {newSection.currentUnits} />);
        }
        setDisplaySections(newSections);
        setCurrentUnits(props.currentUnits);
    }, [props.user]);

    if (props.mcode.includes("CORECO") || props.mcode.includes("NOMAJO")) {
        return (
            <div>
                {displaySections}
            </div>
        )
    } else {
        return (
            <div>
                <div className = "majorWrapperName">
                    {props.name}
                </div>
                <div className = "majorWrapperUnits">
                   Current Units: {currentUnits} / {props.units}
                </div>
                <div>
                    {displaySections}
                </div>
            </div>
        )
    }
}

export default MajorWrapper;