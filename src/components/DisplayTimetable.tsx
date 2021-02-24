import React from 'react';
import Section from './Section';
import sectionClass from '../classes/sectionClass';
import courseClass from '../classes/courseClass';
import yearClass from '../classes/yearClass';
import DegreeWrapper from './DegreeWrapper';
import Year from './Year';
import "./styles/DisplayTimetable.css";

const Timetable = (props : any) => {
    const [displayDegrees, setDisplayDegrees] = React.useState([]);
    const [displayYears, setDisplayYears] = React.useState([]);
    console.log("timetableRerendered");

    const onDrop = (e : any, id : number, sem : any, code : string, dcode : string, mcode : string, name : string)  => {
        e.preventDefault();
        e.stopPropagation();
        let degrees : any = JSON.parse(JSON.stringify(props.user.degrees));
        outerLoop:
        for (let k = 0; k < degrees.length; k++) {
            if (degrees[k].code.toString() === dcode) {
                let degree = degrees[k];
                for (let i = 0; i < degree.sections.length; i++) {
                    let section = degree.sections[i];
                    if (section.mcode === mcode && section.name === name) {
                        let courses = section.courses;
                        for (let j = 0; j < courses.length; j++) {
                            if (courses[j].code === code) {
                                courses.splice(j, 1);
                                break outerLoop;
                            }
                        }
                    }
                }
            }
        }
        let years : any = JSON.parse(JSON.stringify(props.user.years));
        outerLoop2:
        for (let i = 0; i < years.length; i++) {
            let year = years[i];
            if (year.id === id) {
                let semester;
                if (sem === "Semester One") {
                    semester = year.sem1;
                } else if (sem === "Semester Two") {
                    semester = year.sem2;
                } else {
                    semester = year.sum;
                }
                semester.push(new courseClass(e.dataTransfer.getData("dcode"), e.dataTransfer.getData("mcode"), e.dataTransfer.getData("name"), 
                e.dataTransfer.getData("code"), e.dataTransfer.getData("title"), e.dataTransfer.getData("units"),
                e.dataTransfer.getData("sem1"), e.dataTransfer.getData("sem2"), e.dataTransfer.getData("sum"),
                e.dataTransfer.getData("prereq"), e.dataTransfer.getData("incomp")));
                break outerLoop2;
            }
        }
        props.addToTimetable(props.user, degrees, years);
    }

    const onDragOver = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDragStart = (e : any, code : string, title : string, units : number, sem1 : boolean, sem2 : boolean, 
        sum : boolean, prereq : string, incomp: string, dcode : string, mcode: string, name : string) => {
        e.dataTransfer.setData("code", code);
        e.dataTransfer.setData("title", title);
        e.dataTransfer.setData("units", units);
        e.dataTransfer.setData("sem1", sem1);
        e.dataTransfer.setData("sem2", sem2);
        e.dataTransfer.setData("sum", sum);
        e.dataTransfer.setData("prereq", prereq);
        e.dataTransfer.setData("incomp", incomp);
        e.dataTransfer.setData("dcode", dcode);
        e.dataTransfer.setData("mcode", mcode);
        e.dataTransfer.setData("name", name);
    };

    const onClick = (id : number, sem : string, code : string, dcode : string, mcode : string, name : string,
        incomp : string, prereq : string, sem1 : boolean, sem2 : boolean, sum : boolean, title : string, units : number) => {
        let degrees : any = JSON.parse(JSON.stringify(props.user.degrees));
        outerLoop:
        for (let k = 0; k < degrees.length; k++) {
            if (degrees[k].code.toString() === dcode) {
                let degree = degrees[k];
                for (let i = 0; i < degree.sections.length; i++) {
                    let section = degree.sections[i];
                    if (section.mcode === mcode && section.name === name) {
                        let courses = section.courses;
                        courses.push(new courseClass(dcode, mcode, name, code, title, units, sem1, sem2, sum, prereq, incomp));
                        break outerLoop;
                    }
                }
            }
        }
        let years : any = JSON.parse(JSON.stringify(props.user.years));
        outerLoop2:
        for (let i = 0; i < years.length; i++) {
            let year = years[i];
            if (year.id === id) {
                let semester;
                if (sem === "Semester One") {
                    semester = year.sem1;
                } else if (sem === "Semester Two") {
                    semester = year.sem2;
                } else {
                    semester = year.sum;
                }
                for (let j = 0; j < semester.length; j++) {
                    if (semester[j].code === code) {
                        semester.splice(j, 1);
                        break outerLoop2;
                    }
                }
            }
        }
        props.addToTimetable(props.user, degrees, years);
    }

    const getSections = (degreeCode : string, majorIds : any) => {
        let promises : any = [];
        for (let i = 0; i < majorIds.length; i ++) {
            promises.push(fetch('http://localhost:8080/sections?dcode=' + degreeCode + "&mcode=" + majorIds[i]));
        }
        return promises;
    }

    const getSectionCodes = (data : any, degreeCode : string) => {
        let promises : any = [];
        for (let i = 0; i < data.length; i++) {
            let sections = data[i].degrees;
            for (let j = 0; j < sections.length; j++) {
                promises.push(fetch('http://localhost:8080/sectionCodes?dcode=' + degreeCode + "&mcode=" + sections[j].code + "&name=" + sections[j].name));
            }
        }   
        return promises;
    }

    const setSectionDegree = async (num : number, degreeArray : any, degreeComponents : any) => {
        let degree = props.user.degrees[num];
        let degreeCode : string = degree.code.toString();
        let majorIds = [];
        let sectionData : any;
        majorIds.push("CORECO" + degreeCode);
        if (degree.majors === 0 && degree.minors === 0 && degree.emaj === 0) {
            majorIds.push("NOMAJO" + degreeCode);
        } else {
            for (var key of Object.keys(degree.majorCodes)) {
                majorIds.push(key);
            }
            for (var key of Object.keys(degree.minorCodes)) {
                majorIds.push(key);
            }
            for (var key of Object.keys(degree.emajCodes)) {
                majorIds.push(key);
            }
        }
        const responses = await Promise.all(getSections(degreeCode, majorIds)
        );
        const data = await Promise.all(responses.map((response: any) => {
            return response.json();
        }));
        sectionData = data;
        const responses_1 = await Promise.all(getSectionCodes(data, degreeCode));
        const data_2 = await Promise.all(responses_1.map((response_1: any) => {
            return response_1.json();
        }));
        let count = 0;
        let sectionClasses : any = [];
        let sectionComponents : any = [];
        for (let i = 0; i < sectionData.length; i++) {
            let sections = sectionData[i].degrees;
            for (let j = 0; j < sections.length; j++) {
                sectionClasses.push(new sectionClass(degreeCode, sections[j].code, sections[j].name,
                    sections[j].max, sections[j].min, data_2[count]));
                count++;
            }
        }
        degreeArray[num].sections = sectionClasses;
        degreeComponents.push(<DegreeWrapper user = {props.user} dcode = {degreeCode} name = {degree.name} units = {degree.unit} sections = {sectionComponents} />)
        if (num < props.user.degrees.length - 1) {
            setSectionDegree(num + 1, degreeArray, degreeComponents);
        } else {
            props.initDegrees(props.user, degreeArray);
            setDisplayDegrees(degreeComponents);
        }
    }
    
    const existingSections = (degrees : any) => {
        let newDegrees : any = [];
        for (let i = 0; i < degrees.length; i++) {
            let degree = degrees[i];
            newDegrees.push(<DegreeWrapper dcode = {degree.code} name = {degree.name} units = {degree.unit} sections = {degree.sections} onDragStart = {onDragStart}
            user = {props.user}/>);
        }
        return newDegrees;
    }


    const existingYears = (years : any) => {
        let newYears : any = [];
        for (let i = 0; i < years.length; i++) {
            let year = years[i];
            newYears.push(<Year id = {year.id} key = {year.id} onClick = {onClick} onDragOver = {onDragOver} onDrop = {onDrop} sem1 = {year.sem1} 
                sem2 = {year.sem2} sum = {year.sum} user = {props.user} finalYear = {year.finalYear} deleteYear = {deleteYear}/>);
        }
        return newYears;
    }

    const addYear = () => {
        let newYears = JSON.parse(JSON.stringify(props.user.years));
        let newId = newYears.length + 1
        newYears.push(new yearClass([], [], [], newId));
        if (newYears.length > 1) {
            newYears[newYears.length - 2].finalYear = false;
        }
        props.addToTimetable(props.user, props.user.degrees, newYears);
    }

    const deleteYear = () => {
        let newYears = JSON.parse(JSON.stringify(props.user.years));
        newYears.splice(newYears.length -1, 1);
        if (newYears.length > 0) {
            newYears[newYears.length - 1].finalYear = true;
        }
        props.addToTimetable(props.user, props.user.degrees, newYears);
    }

    React.useEffect(() => {
        if (!props.user.sectionsSelected) {
            let newDegrees : any = JSON.parse(JSON.stringify(props.user.degrees));
            setSectionDegree(0, newDegrees, []);
        }
    }, []);

    React.useEffect(() => {
        let newDegrees = existingSections(props.user.degrees);
        let newYears = existingYears(props.user.years);
        setDisplayDegrees(newDegrees);
        setDisplayYears(newYears);
    }, [props.user]);

    return (
        <div className = "sectionContainer">
            <div className = "sections">
                {displayDegrees}
            </div>
            <div className = 'sem-drop-zone'>
                <button onClick = {addYear} className = "addYearButton">
                    Add additional year
                </button>
                {displayYears}
            </div>
        </div>
    )
}

export default Timetable;