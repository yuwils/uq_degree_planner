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

import './styles/DisplayWindow.css'

const Display = () => {
    const [user, setUser] = useStickyState(new User(), 'user');

    const resetPlanner = () => {
        console.log("user reset");
        setUser(new User());
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
        newUser.degrees[newUser.degrees.length - 1].emaj = majorDetails.emaj;
        setUser(newUser);
    };

    let displayType: JSX.Element;
    if (user.stage === 0) {
        displayType = <RequestDegree user = {user} handler = { degreeSelected }/>;
    } else if (user.stage === 1) {
        displayType = <RequestDegreeType user = {user} handler = { degreeTypeSelected }/>;
    } else if (user.stage === 2) {
        displayType = <RequestMajor/>;
    } else if (user.stage === 3) {
        displayType = <RequestNewDegree/>;
    } else {
        displayType = <Timetable/>;
    }

    return (
        <div className = "Display">
        <div className = "InnerDisplay"> {displayType} </div>
        <div className = "ResetButton" onClick = { resetPlanner } > <ResetButton /> </div>
        </div>
    )
}

export default Display;