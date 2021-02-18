import React from 'react';
import Section from './Section';
import sectionClass from '../classes/sectionClass';
import "./styles/DisplayTimetable.css";

const Timetable = (props : any) => {
    const [displaySections, setDisplaySections] = React.useState([]);

    const onDrop = (e : any) => {
        console.log("ended");
    }

    const onDragOver = (e : any) => {
        console.log("over");
    };

    const onDragStart = (e : any) => {
        console.log("started");
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
        console.log(props.user.degrees.length);
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
                    max={sections[j].max} min={sections[j].min} data={data_2[count]} onDragStart = {onDragStart}/>);
                count++;
            }
        }
        if (num < props.user.degrees.length - 1) {
            setSectionDegree(num + 1, sectionClasses, sectionComponents);
        } else {
            props.setSections(props.user, sectionClasses);
            setDisplaySections(sectionComponents);
        }
    }
    
    React.useEffect(() => {
        setSectionDegree(0, [], []);
    }, []);

    return (
        <div className = "sectionContainer">
            <div className = "sections">
                {displaySections}
            </div>
            <div className = 'sem-drop-zone' onDragOver = {e => onDragOver(e)} onDrop ={e => onDrop(e)}>
                yest
                <p>d</p>
            </div>
        </div>
    )
}

export default Timetable;