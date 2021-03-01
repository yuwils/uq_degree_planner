import React, { useState, useEffect } from 'react';
import Course from './Course';
import './styles/Semester.css';

const Semester = (props : any) => {
    const [classes, setClasses] = useState([]);
    const [errorMessage, setErrorMesssage] = useState("");
    const [currentClassName, setCurrentClassName] = useState("entireSemesterNotHover");

    const onDragExit = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentClassName("entireSemesterNotHover");
    }

    const onDragOver = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("testing");
        props.onDragOver(e);
    }

    const onDragEnter = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentClassName("entireSemesterHover");
    }

    const onDrop = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentClassName("entireSemesterNotHover");
        let newClasses : any = [];
        if (e.dataTransfer.getData("sem1") === "true" || e.dataTransfer.getData("sem2") === "true" || e.dataTransfer.getData("sum") === "true" ) {
            if ((props.sem === "Semester One" && e.dataTransfer.getData("sem1") !== "true") || 
            (props.sem === "Semester Two" && e.dataTransfer.getData("sem2") !== "true") ||
            (props.sem === "Summer Semester" && e.dataTransfer.getData("sum") !== "true")) {
                setErrorMesssage(e.dataTransfer.getData("code") + " cannot be taken in " + props.sem);
                setTimeout(() => {
                    setErrorMesssage("");
                }, 1000);
                return;
            }
        }
        if (classes !== undefined) {
            for (let i = 0; i < props.classes.length; i++) {
                let newClass = props.classes[i];
                newClasses.push(<Course code={newClass.code} title={newClass.title} units={newClass.units}
                sem1={newClass.sem1} sem2={newClass.sem2} sum ={newClass.sum}  
                prereq ={newClass.prereq} incomp ={newClass.incomp} key = {newClass.code}
                sem = {props.sem} id = {props.id} 
                dcode = {newClass.dcode} 
                mcode = {newClass.mcode} 
                name = {newClass.name}/>);
            }
        }
        newClasses.push(<Course onClick = {props.onClick} code={e.dataTransfer.getData("code")} title={e.dataTransfer.getData("title")} 
            units={parseInt(e.dataTransfer.getData("units"))}
            sem1={e.dataTransfer.getData("sem1") === 'true'} sem2={e.dataTransfer.getData("sem2") === 'true'} sum ={e.dataTransfer.getData("sum") === 'true'}  
            prereq ={e.dataTransfer.getData("prereq")} incomp ={e.dataTransfer.getData("incomp")} key = {e.dataTransfer.getData("code")}
            dcode = {e.dataTransfer.getData("dcode")}
            mcode = {e.dataTransfer.getData("mcode")}
            name = {e.dataTransfer.getData("name")}
            sem = {props.sem} id = {props.id} />);
        setClasses(newClasses);
        props.onDrop(e, props.id, props.sem, e.dataTransfer.getData("code"), e.dataTransfer.getData("dcode"), 
            e.dataTransfer.getData("mcode"), e.dataTransfer.getData("name"), parseInt(e.dataTransfer.getData("units")));
    }

    React.useEffect(() => {
        let newClasses : any = [];
        for (let i = 0; i < props.classes.length; i++) {
            let newClass = props.classes[i];
            newClasses.push(<Course onClick = {props.onClick} code={newClass.code} title={newClass.title} units={newClass.units}
            sem1={newClass.sem1} sem2={newClass.sem2} sum ={newClass.sum}  
            prereq ={newClass.prereq} incomp ={newClass.incomp} key = {newClass.code} sem = {props.sem} id = {props.id} dcode = {newClass.dcode} 
            mcode = {newClass.mcode} name = {newClass.name} />);
        }
        setClasses(newClasses);
    }, [props.user]);

    return (
        <div onDragEnter = {(e) => onDragEnter(e)} onDragExit = {(e) => onDragExit(e)} onDragOver = {(e) => onDragOver(e)} onDrop = {(e) => onDrop(e)}>
            <div className = "semester">
                {props.sem}
            </div>
            <div className = {currentClassName}>
                <div>
                    {classes}
                </div>
                <div className = "buffer">
                    <div className = "errorMessage">
                        {errorMessage}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Semester;