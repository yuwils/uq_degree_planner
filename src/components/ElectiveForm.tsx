import React from 'react';
import Course from './Course';
import './styles/ElectiveForm.css';

const ElectiveForm = (props : any) => {
    const [displayElectiveClass, setDisplayElectiveClass] = React.useState<any>("");
    const curFormValue = React.useRef("");

    const handleSubmission = (event: any) => {
        event.preventDefault();
        props.electiveHandler(props.dcode, curFormValue.current.toUpperCase());
        event.target.reset();
    }

    const handleChange = (event: any) => {
        event.preventDefault();
        curFormValue.current = event.target.value;
    };

    React.useEffect(() => {
        if (typeof props.elective === 'object' && props.elective.name === "ELECTIVE") {
            setDisplayElectiveClass((<Course isDraggable = {true} onDragStart = {props.onDragStart} code={props.elective.code} 
                title={props.elective.title} 
                units={props.elective.units} sem1={props.elective.sem1} sem2={props.elective.sem2} sum ={props.elective.sum}  prereq ={props.elective.prereq} 
               incomp ={props.elective.incomp} dcode = {props.dcode} mcode = {"ELECTIVE"} name = {"ELECTIVE"} key = {props.elective.code} /> ));
        } else if (props.elective === "") {
            setDisplayElectiveClass("");
        } else {
            setDisplayElectiveClass("This course could not be found");
            setTimeout(() => {
                setDisplayElectiveClass("");
            }, 1000);
        }
    }, [props.user]);

    return (
        <div>
            <div className = "electiveHeadline">
                {props.dName} Electives:
            </div>
            <div className = "electiveForm">
                <form onSubmit= {handleSubmission}>
                    <label>
                        <input className = "electiveForm" type = "text" name = "elective" 
                        placeholder = {"Search for an elective class (e.g ECON1010)"} onChange = { handleChange }/>
                    </label>
                </form>
            </div>
            <div className = "electiveResult">
                {displayElectiveClass}
            </div>
        </div>
    )
}

export default ElectiveForm;