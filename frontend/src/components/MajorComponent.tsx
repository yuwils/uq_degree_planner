import SectionComponent from './SectionComponent';
import { Major, Section } from '../types/Types';
import './styles/MajorWrapper.css'

type MajorProps = {
    dcode: string;
    major: Major;
}
const MajorComponent = (props : MajorProps) => {
    if (props.major.mcode.includes("CORECO") || props.major.mcode.includes("NOMAJO")) {
        return (
            <div>
                {props.major.sections.map((section : Section) => <SectionComponent dcode={props.dcode} mcode={props.major.mcode} section={section}/>)}
            </div>
        )
    } else {
        return (
            <div>
                <div className = "majorWrapperName">
                    {props.major.name}
                </div>
                <div className = "majorWrapperUnits">
                   Current Units: {props.major.currentUnits} / {props.major.units}
                </div>
                <div>
                    {props.major.sections.map((section : Section) =>
                        <SectionComponent key={section.name} dcode={props.dcode} mcode={props.major.mcode} section={section}/>
                    )}
                </div>
            </div>
        )
    }
}

export default MajorComponent;