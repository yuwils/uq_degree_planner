import { useState, useEffect } from 'react';
import {Page, DegreeOption} from '../types/types';
import SelectionGridElement from "./SelectionGridElement";
import {selectLastDegree, addDegreeOption, changePage} from '../reducers/reducers';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import "./styles/RequestDegreeType.css";

const RequestDegreeType = () => {
    const userLastDegree = useAppSelector(selectLastDegree);
    const dispatch = useAppDispatch();
    const [degreeOptions, setDegreeOptions] = useState<DegreeOption[]>([]);

    const degreeOptionButtonText = (degreeOption: DegreeOption) => {
        const majorText = degreeOption.majors ? "Majors: " + degreeOption.majors.toString() + " " : "";
        const minorText = degreeOption.minors ? "Minors: " + degreeOption.minors.toString() + " " : "";
        const extendedMajorText = degreeOption.extendedMajors ? "Extended Majors: " + degreeOption.extendedMajors.toString() + " " : "";
        const buttonText = majorText + minorText + extendedMajorText ? majorText + minorText + extendedMajorText : "No Major";
        return buttonText;
    };

    useEffect(() => { 
        fetch('http://localhost:8080/degreeOptions?code=' + userLastDegree?.code).then(
            response => response.json()).then(data => {
            const degreeOptions = data.map((x : any) => {
                const degreeOption: DegreeOption = {
                    majors: x.majors,
                    minors: x.minors,
                    extendedMajors: x.extendedMajors,
                };
                return degreeOption;
            });
            setDegreeOptions(degreeOptions);
        });
    }, []);

    return (
        <div className = "RequestDegree">
            <div className = "requestDegreeHeadline">
                Select Your Degree Type
            </div>
            <div className = "RequestDegreeWrapper">
                {degreeOptions.map((degreeOption) => <SelectionGridElement key={degreeOptionButtonText(degreeOption)} className = "SelectionGridElement" 
                    name = {degreeOptionButtonText(degreeOption)} 
                    onClick = {() => {
                        dispatch(addDegreeOption(degreeOption));
                        if (degreeOption.majors == 0 && degreeOption.minors == 0 && degreeOption.extendedMajors == 0) {
                            dispatch(changePage(Page.RequestNewDegree))
                        } else {
                            dispatch(changePage(Page.RequestMajor)); 
                        }
                    }}/>)}
            </div>
        </div>
    )
}

export default RequestDegreeType;