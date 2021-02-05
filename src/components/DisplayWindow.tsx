import React from 'react';
import useStickyState from '../hooks/useStickyState';
import User from '../classes/user';
import RequestDegree from './RequestDegree';
import RequestDegreeType from './RequestDegreeType';
import RequestMajor from './RequestMajor';
import Timetable from './DisplayTimetable';
import ResetButton from './reset';

import './styles/DisplayWindow.css'

const Display = () => {
    const [user, setUser] = useStickyState(new User(), 'user');


    const resetPlanner = () => {
        console.log("user reset");
        setUser(new User());
    }

    const degreeSelected = () => {
        console.log("clicked!")
        let newUser: User = new User();
        newUser.stage = 1;
        setUser(newUser);
    }

    let displayType: JSX.Element;
    if (user.stage === 0) {
        displayType = <RequestDegree user1 = {user } handler = { degreeSelected }/>;
    } else if (user.stage === 1) {
        displayType = <RequestDegreeType/>;
    } else if (user.stage === 2) {
        displayType = <RequestMajor/>;
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