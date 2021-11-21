import { useEffect } from 'react';
import {MajorType, Section, SectionCodeWithOptions, SectionCodeWithoutOptions, Course, Degree, Year} from '../types/Types';
import DegreeComponent from './DegreeComponent';
import YearComponent from './YearComponent';
import {selectSectionsSelected, selectDegrees, selectYears, addSections, addYear} from '../reducers/UserReducer';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import "./styles/DisplayTimetable.css";

const Timetable = () => {
    const dispatch = useAppDispatch();
    const sectionsSelected = useAppSelector(selectSectionsSelected);
    const userDegrees = useAppSelector(selectDegrees);
    const userYears = useAppSelector(selectYears);

    // Filter for sections with the same degree and major codes then deserialise from back-end to front-end
    // representation of data.
    // This is really hard to read and not ideal: consider something like Quicktype but its probably fine for this.
    const getSectionsFromSectionData = (dcode: string, mcode: String, sectionData: any) => {
        return sectionData.filter((x : any) => x.dcode === dcode && x.mcode === mcode).map((section : any) => {
            const newSection : Section = {
                dcode: section.dcode,
                mcode: section.mcode,
                name: section.sectionName,
                max: section.max,
                min: section.min,
                sectionCodesWithOptions: section.sectionCodesWithOptions.map((x: any) => {
                    const newSectionCodesWithOptions : SectionCodeWithOptions = {
                        courses: x.courses.map((x : any) => {
                            const newCourse : Course = {
                                dcode: dcode,
                                mcode: mcode,
                                name: section.sectionName,
                                ...x,
                            };
                            return newCourse;
                        }),
                        optionCode: x.optionCode
                    };  
                    return newSectionCodesWithOptions;
                }),
                sectionCodesWithoutOptions: section.sectionCodesWithoutOptions.map((x : any) => {
                    const newSectionCodesWithoutOptions : SectionCodeWithoutOptions = {
                        course: {
                            dcode: dcode,
                            mcode: mcode,
                            name: section.sectionName,
                            ...x.course,
                        }
                    };
                    return newSectionCodesWithoutOptions;
                }),
                currentUnits: 0,
            }
            return newSection;
        })
    } 
    
    const getSections = async () => {
        const allDegreeCodes = userDegrees.map(degree => degree.code);

        // Get all of the major codes for each degree into one list
        const allMajorCodes = userDegrees.map(degree => {
            return degree.majorCodes.map(major => major.mcode).concat(degree.minorCodes.map(major => major.mcode), 
                degree.extendedMajorCodes.map(major => major.mcode));
        }).flat();

        const sectionResponse = await fetch('http://localhost:8080/sections?dcodes=' + allDegreeCodes + "&mcodes=" + allMajorCodes);
        const sectionData = await sectionResponse.json();

        // For each major, minor and extended major for each degree
        for (const degree of userDegrees) {
            for (const major of degree.majorCodes) {
                dispatch(addSections({dcode: degree.code, mcode:major.mcode, type: MajorType.Major, 
                    sections: getSectionsFromSectionData(degree.code, major.mcode, sectionData)}))
            }
            for (const minor of degree.minorCodes) {
                dispatch(addSections({dcode: degree.code, mcode:minor.mcode, type: MajorType.Minor, 
                    sections: getSectionsFromSectionData(degree.code, minor.mcode, sectionData)}))
            }   
            for (const extendedMajor of degree.extendedMajorCodes) {
                dispatch(addSections({dcode: degree.code, mcode:extendedMajor.mcode, type: MajorType.ExtendedMajor, 
                    sections: getSectionsFromSectionData(degree.code, extendedMajor.mcode, sectionData)}))
            }
        };
        dispatch(addYear());
    }

    useEffect(() => {
        if (!sectionsSelected) {
            getSections();
        }
    }, []);

    return (
        <div className = "sectionContainer">
            <div className = "sections">
                {userDegrees.map((degree: Degree) => <DegreeComponent key = {degree.code} degree = {degree}/>)}
            </div>
            <div className = 'sem-drop-zone'>
                <button onClick = {() => {dispatch(addYear())}} className = "addYearButton">
                    Add Additional Year
                </button>
                {userYears.map((year: Year) => <YearComponent key = {year.id} year = {year}/>)}
            </div>
        </div>
    )
}

export default Timetable;