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
import yearClass from '../classes/yearClass';
import './styles/DisplayWindow.css';

const Display = () => {
    const [user, setUser] = useStickyState(new User(), 'user');

    console.log("displayrerender");

    const resetPlanner = () => {
        setUser(new User());
        window.location.reload();
    };

    const degreeSelected = (user: User, code: number) => {
        let newUser: User = new User();
        newUser.stage = 1;
        let degreeList = user.degrees.slice();
        let newDegree = new Degree();
        newDegree.code = code;
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

    const majorSelected = (user : User, currentMajorCode : string, newCode : string, newName : string, type : string) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        if (type === 'Major') {
            if (newUser.degrees[newUser.degrees.length - 1].majorCodes[newCode] !== undefined) {
                return false;
            }
            if (newUser.degrees[newUser.degrees.length - 1].majorCodes[currentMajorCode] !== undefined) {
                delete newUser.degrees[newUser.degrees.length - 1].majorCodes[currentMajorCode];
            }
            newUser.degrees[newUser.degrees.length - 1].majorCodes[newCode] = newName;
        } else if (type === 'Minor') {
            if (newUser.degrees[newUser.degrees.length - 1].minorCodes[newCode] !== undefined) {
                return false;
            }
            if (newUser.degrees[newUser.degrees.length - 1].minorCodes[currentMajorCode] !== undefined) {
                delete newUser.degrees[newUser.degrees.length - 1].minorCodes[currentMajorCode];
            }
            newUser.degrees[newUser.degrees.length - 1].minorCodes[newCode] = newName;
        } else if (type === 'Extended Major') {
            if (newUser.degrees[newUser.degrees.length - 1].emajCodes[newCode] !== undefined) {
                return false;
            }
            if (newUser.degrees[newUser.degrees.length - 1].emajCodes[currentMajorCode] !== undefined) {
                delete newUser.degrees[newUser.degrees.length - 1].emajCodes[currentMajorCode];
            }
            newUser.degrees[newUser.degrees.length - 1].emajCodes[newCode] = newName;
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
            newUser.stage = 3;
            setUser(newUser);
        }
    }

    const initSections = (user : User, elements : any) => {
        let newUser : User = JSON.parse(JSON.stringify(user));
        newUser.sections = elements;
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
        newUser.sections = elements;
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
        displayType = <Timetable user = {user} addToTimetable = {addToTimetable} initSections = { initSections } setYears = { setYears }/>;
    }

    return (
        <div className = "Display">
        <div className = "InnerDisplay"> {displayType} </div>
        <div className = "ResetButton" onClick = { resetPlanner } > <ResetButton /> </div>
        </div>
    )
}

export default Display;