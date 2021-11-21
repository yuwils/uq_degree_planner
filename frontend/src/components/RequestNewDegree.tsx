import SelectionGridElement from "./SelectionGridElement";
import {MajorType, Major, Page} from '../types/Types';
import {selectLastDegree, changePage, addMajor} from '../reducers/UserReducer';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';

import './styles/RequestNewDegree.css';

const RequestNewDegree = () => {
    const dispatch = useAppDispatch();
    const userDegree = useAppSelector(selectLastDegree);

    const addExtraDegree = (addExtraDegree : boolean) => {
        const coreCourses : Major = {
            mcode: "CORECO" + userDegree?.code.toString(),
            name: "Core Courses",
            units: -1,
            type: MajorType.Major,
            sections: [],
            currentUnits: 0,
        }
        dispatch(addMajor({unshift: true, major: coreCourses}));

        if (userDegree?.degreeOption?.majors === 0 && userDegree?.degreeOption?.minors === 0 && userDegree?.degreeOption?.extendedMajors === 0) {
            const majorlessCourses : Major = {
                mcode: "NOMAJO" + userDegree?.code.toString(),
                name: "No Major Courses",
                units: -1,
                type: MajorType.Major,
                sections: [],
                currentUnits: 0,
            }
            dispatch(addMajor({unshift: false, major: majorlessCourses}));
        }
        
        if (addExtraDegree) {
            dispatch(changePage(Page.RequestDegree));
        } else {
            dispatch(changePage(Page.Timetable));
        }
    }

    return (
        <div>
            <div>
                <div className = "requestHeadline">
                    Select another degree?
                </div>
                <div className = "requestExplain"> 
                    This option is intended for degree structures such as diplomas, Education and dual degrees in which different degrees are studied concurrently. 
                </div>
            </div>
            <div className = "requestButtons">
                <SelectionGridElement className = "degreeSelection" onClick = {() => addExtraDegree(true)} name = "Yes" />
                <SelectionGridElement className = "degreeSelection" onClick = {() => addExtraDegree(false)} name = "No" />
            </div>
        </div>
    )
}

export default RequestNewDegree;