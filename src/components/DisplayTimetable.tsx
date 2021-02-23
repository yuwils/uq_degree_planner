import React from 'react';
import Section from './Section';
import sectionClass from '../classes/sectionClass';
import courseClass from '../classes/courseClass';
import Year from './Year';
import "./styles/DisplayTimetable.css";

const Timetable = (props : any) => {
    const [displaySections, setDisplaySections] = React.useState([]);
    const [displayYears, setDisplayYears] = React.useState([]);
    console.log("timetableRerendered");

    //e : any, id : number, sem : any, code : string, dcode : string, mcode : string, name : string
    const onDrop = (e : any, id : number, sem : any, code : string, dcode : string, mcode : string, name : string)  => {
        e.preventDefault();
        e.stopPropagation();
        let sections : any = JSON.parse(JSON.stringify(props.user.sections));
        outerLoop:
        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            if (section.dcode === dcode && section.mcode === mcode && section.name === name) {
                let courses = sections[i].courses;
                for (let j = 0; j < courses.length; j++) {
                    if (courses[j].code === code) {
                        courses.splice(j, 1);
                        break outerLoop;
                    }
                }
            }
        }
        let years : any = JSON.parse(JSON.stringify(props.user.years));
        console.log(years);

        outerLoop2:
        for (let i = 0; i < years.length; i++) {
            let year = years[i];
            if (year.id = id) {
                let semester;
                if (sem === "Semester One") {
                    semester = year.sem1;
                } else if (sem === "Semester Two") {
                    semester = year.sem2;
                } else {
                    semester = year.sum;
                }
                semester.push(new courseClass(e.dataTransfer.getData("code"), e.dataTransfer.getData("title"), e.dataTransfer.getData("units"),
                e.dataTransfer.getData("sem1"), e.dataTransfer.getData("sem2"), e.dataTransfer.getData("sum"),
                e.dataTransfer.getData("prereq"), e.dataTransfer.getData("incomp")));
                break outerLoop2;
            }
        }
        props.addToTimetable(props.user, sections, years);
    }

    const onDragOver = (e : any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("over");
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

    const setSectionDegree = async (num : number, sectionClasses : any, sectionComponents : any) => {
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
        for (let i = 0; i < sectionData.length; i++) {
            let sections = sectionData[i].degrees;
            for (let j = 0; j < sections.length; j++) {
                sectionClasses.push(new sectionClass(degreeCode, sections[j].code, sections[j].name,
                    sections[j].max, sections[j].min, data_2[count]));
                sectionComponents.push(<Section dcode={degreeCode} mcode={sections[j].code} name={sections[j].name}
                    max={sections[j].max} min={sections[j].min} data={data_2[count]} onDragStart = {onDragStart} user = {props.user}/>);
                count++;
            }
        }
        if (num < props.user.degrees.length - 1) {
            setSectionDegree(num + 1, sectionClasses, sectionComponents);
        } else {
            props.initSections(props.user, sectionClasses);
            setDisplaySections(sectionComponents);
        }
    }
    
    const existingSections = (sections : any) => {
        let newSections : any = [];
        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            newSections.push(<Section dcode={section.dcode} mcode={section.mcode} name={section.name}
                max={section.max} min={section.min} data={section.courses} onDragStart = {onDragStart} key = {section.name} user = {props.user} />);
        }
        return newSections;
    }


    const existingYears = (years : any) => {
        let newYears : any = [];
        for (let i = 0; i < years.length; i++) {
            let year = years[i];
            newYears.push(<Year id = {year.id} key = {year.id} onDragOver = {onDragOver} onDrop = {onDrop} sem1 = {year.sem1} 
                sem2 = {year.sem2} sum = {year.sum} user = {props.user}/>);
        }
        return newYears;
    }


    React.useEffect(() => {
        if (!props.user.sectionsSelected) {
            setSectionDegree(0, [], []);
        }
    }, []);

    React.useEffect(() => {
        let newSections = existingSections(props.user.sections);
        let newYears = existingYears(props.user.years);
        setDisplaySections(newSections);
        setDisplayYears(newYears);
        console.log(props.user);
    }, [props.user]);

    return (
        <div className = "sectionContainer">
            <div className = "sections">
                {displaySections}
            </div>
            <div className = 'sem-drop-zone'>
                {displayYears}
            </div>
        </div>
    )
}

export default Timetable;