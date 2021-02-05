import React from 'react';
import useStickyState from '../hooks/useStickyState';
import User from '../classes/user';
import RequestDegree from './RequestDegree';
import RequestDegreeType from './RequestDegreeType';
import RequestMajor from './RequestMajor';
import Timetable from './DisplayTimetable';


const Display = () => {
    const [user, setUser] = useStickyState(new User(), 'user');
    let displayType: JSX.Element;
    if (user.stage === 0) {
        displayType = <RequestDegree/>
    } else if (user.stage === 1) {
        displayType = <RequestDegreeType/>
    } else if (user.stage === 2) {
        displayType = <RequestMajor/>
    } else {
        displayType = <Timetable/>
    }
    return (
        displayType
    )
}

export default Display;