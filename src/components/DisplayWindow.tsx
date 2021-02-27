import React from 'react';
import useStickyState from '../hooks/useStickyState';
import User from '../classes/user';
import Degree from '../classes/degree';
import RequestDegree from './RequestDegree';
import RequestDegreeType from './RequestDegreeType';
import RequestMajor from './RequestMajor';
import Timetable from './DisplayTimetable';
import RequestNewDegree from './RequestNewDegree';
import ResetButton from './reset';
import majorClass from '../classes/majorClass';
import './styles/DisplayWindow.css';

const Display = () => {
    const [user, setUser] = useStickyState(new User(), 'user');

    console.log("displayrerender");

    const resetPlanner = () => {
        setUser(new User());
    };

    const degreeSelected = (user: User, element: any) => {
        let newUser: User = new User();
        newUser.stage = 1;
        let degreeList = user.degrees.slice();
        let newDegree = new Degree(element.code, element.name, element.units);
        degreeList.push(newDegree);
        newUser.degrees = degreeList;
        setUser(newUser);
    };

    const degreeTypeSelected = (user : User, majorDetails : any) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        newUser.stage = 2;
        newUser.degrees[newUser.degrees.length - 1].majors = majorDetails.majors;
        newUser.degrees[newUser.degrees.length - 1].minors = majorDetails.minors;
        newUser.degrees[newUser.degrees.length - 1].emaj = majorDetails.emajors;
        setUser(newUser);
    };

    const majorSelected = (user : User, currentMajorCode : string, newCode : string, newName : string, newUnits : number, type : string) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        let curCodeIndex = -1;
        if (type === 'Major') {
            for (let i = 0; i < newUser.degrees[newUser.degrees.length - 1].majorCodes.length; i++) {
                if (newUser.degrees[newUser.degrees.length - 1].majorCodes[i].code === newCode) {
                    return false;
                }
                if (newUser.degrees[newUser.degrees.length - 1].majorCodes[i].code === currentMajorCode) {
                    curCodeIndex = i;
                }
            }
            if (curCodeIndex > -1) {
                newUser.degrees[newUser.degrees.length - 1].majorCodes.splice(curCodeIndex, 1);
            }
            newUser.degrees[newUser.degrees.length - 1].majorCodes.push(new majorClass(newCode, newName, newUnits));
        } else if (type === 'Minor') {
            for (let i = 0; i < newUser.degrees[newUser.degrees.length - 1].minorCodes.length; i++) {
                if (newUser.degrees[newUser.degrees.length - 1].minorCodes[i].code === newCode) {
                    return false;
                }
                if (newUser.degrees[newUser.degrees.length - 1].minorCodes[i].code === currentMajorCode) {
                    curCodeIndex = i;
                }
            }
            if (curCodeIndex > -1) {
                newUser.degrees[newUser.degrees.length - 1].minorCodes.splice(curCodeIndex, 1);
            }
            newUser.degrees[newUser.degrees.length - 1].minorCodes.push(new majorClass(newCode, newName, newUnits));
        } else if (type === 'Extended Major') {
            for (let i = 0; i < newUser.degrees[newUser.degrees.length - 1].emajCodes.length; i++) {
                if (newUser.degrees[newUser.degrees.length - 1].emajCodes[i].code === newCode) {
                    return false;
                }
                if (newUser.degrees[newUser.degrees.length - 1].emajCodes[i].code === currentMajorCode) {
                    curCodeIndex = i;
                }
            }
            if (curCodeIndex > -1) {
                newUser.degrees[newUser.degrees.length - 1].emajCodes.splice(curCodeIndex, 1);
            }
            newUser.degrees[newUser.degrees.length - 1].emajCodes.push(new majorClass(newCode, newName, newUnits));
        }
        setUser(newUser);
        return true;
    }

    const addExtraDegree = (user : User, addExtraDegree : boolean) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        if (addExtraDegree) {
            newUser.stage = 0;
        } else {
            newUser.stage = 4;
        }
        setUser(newUser);
    }

    const handleMajorFinalisation = (user : User, elements : String) => {
        let curDegree = user.degrees[user.degrees.length - 1];
        if(Object.keys(curDegree.majorCodes).length === curDegree.majors && Object.keys(curDegree.minorCodes).length === curDegree.minors &&
         Object.keys(curDegree.emajCodes).length === curDegree.emaj ) {
            let newUser : User = JSON.parse(JSON.stringify(user));
            newUser.degrees[user.degrees.length - 1].majorCodes.unshift(new majorClass("CORECO" + curDegree.code.toString(), "Core Courses", -1));
             if (curDegree.majors === 0 && curDegree.minors === 0 && curDegree.emaj === 0) {
                newUser.degrees[user.degrees.length - 1].majorCodes.push(new majorClass("NOMAJO" + curDegree.code.toString(), "No Major Courses", -1));
             }
            newUser.stage = 3;
            setUser(newUser);
        }
    }

    const initDegrees = (user : User, elements : any) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        newUser.degrees = elements;
        newUser.sectionsSelected = true;
        setUser(newUser);
    }

    const setYears = (user : User, elements : any) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        newUser.years = elements;
        setUser(newUser);
    }

    const addToTimetable = (user : User, elements : any, years : any) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        newUser.degrees = elements;
        newUser.years = years;
        setUser(newUser);
    }

    let displayType: JSX.Element;
    if (user.stage === 0) {
        displayType = <RequestDegree user = {user} handler = { degreeSelected }/>;
    } else if (user.stage === 1) {
        displayType = <RequestDegreeType user = {user} handler = { degreeTypeSelected }/>;
    } else if (user.stage === 2) {
        displayType = <RequestMajor user = {user} handler = { majorSelected } handler2 = { handleMajorFinalisation }/>;
    } else if (user.stage === 3) {
        displayType = <RequestNewDegree user = {user} handler = { addExtraDegree }/>;
    } else {
        displayType = <Timetable user = {user} addToTimetable = {addToTimetable} initDegrees = { initDegrees } setYears = { setYears }/>;
    }

    return (
        <div className = "Display">
        <div className = "InnerDisplay"> {displayType} </div>
        <div className = "ResetButton" onClick = { resetPlanner } > <ResetButton /> </div>
        </div>
    )
}

export default Display;