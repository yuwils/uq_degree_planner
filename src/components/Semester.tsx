import React, { useState, useEffect } from 'react';
import Course from './Course';
import './styles/Semester.css';

const Semester = (props : any) => {
    const [classes, setClasses] = useState([]);

    const onDragOver = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        props.onDragOver(e);
    }

    const onDrop = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        let newClasses : any = [];
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
            units={e.dataTransfer.getData("units")}
            sem1={e.dataTransfer.getData("sem1")} sem2={e.dataTransfer.getData("sem2")} sum ={e.dataTransfer.getData("sum")}  
            prereq ={e.dataTransfer.getData("prereq")} incomp ={e.dataTransfer.getData("incomp")} key = {e.dataTransfer.getData("code")}
            dcode = {e.dataTransfer.getData("dcode")}
            mcode = {e.dataTransfer.getData("mcode")}
            name = {e.dataTransfer.getData("name")}
            sem = {props.sem} id = {props.id} />);
        setClasses(newClasses);
        props.onDrop(e, props.id, props.sem, e.dataTransfer.getData("code"), e.dataTransfer.getData("dcode"), 
            e.dataTransfer.getData("mcode"), e.dataTransfer.getData("name"));
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
        <div onDragOver = {(e) => onDragOver(e)} onDrop = {(e) => onDrop(e)}>
            <div className = "semester">
                {props.sem}
            </div>
            <div>
                {classes}
            </div>
            <div className = "buffer">
            </div>
        </div>
    )
}

export default Semester;