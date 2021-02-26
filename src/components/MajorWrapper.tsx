import React from 'react';
import Section from './Section';
import './styles/MajorWrapper.css'

const MajorWrapper = (props : any) => {
    const [displaySections, setDisplaySections] = React.useState([]);

    React.useEffect(() => {
        let newSections : any = [];
        for (let i = 0; i < props.sections.length; i++) {
            let newSection = props.sections[i];
            newSections.push(<Section dcode={props.dcode} mcode={props.mcode} name={newSection.name}
            max={newSection.max} min={newSection.min} data={newSection.courses} onDragStart = {props.onDragStart} user = {props.user}/>);
        }
        setDisplaySections(newSections);
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
                    Units: {props.units}
                </div>
                <div>
                    {displaySections}
                </div>
            </div>
        )
    }
}

export default MajorWrapper;