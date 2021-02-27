import React, { useEffect } from 'react';
import SelectionGridElement from "./SelectionGridElement";
import "./styles/RequestDegreeType.css";

const RequestDegreeType = (props: any) => {
    const [majorGrid, setMajorGrid] = React.useState([]);

    const setMajorHelper = (degrees: any) => {
        let majorGrid : any = [];
        for (let i = 0; i < degrees.length; i++) {
            let majorText : string, minorText : string, emajText :string;
            if (degrees[i].majors > 0) {
                majorText = "Majors: " + degrees[i].majors.toString() + " ";
            } else {
                majorText = "";
            }
            if (degrees[i].minors > 0) {
                minorText = "Minors: " + degrees[i].minors.toString() + " ";
            } else {
                minorText = "";
            }
            if (degrees[i].emajors > 0) {
                emajText = "Extended Majors: " + degrees[i].emajors.toString();
            } else {
                emajText = "";
            }
            let name1 : string = majorText + minorText + emajText;
            if (name1 === "") {
                name1 = "No Major";
            }
            majorGrid.push(<SelectionGridElement className = "SelectionGridElement" user = {props.user} onClick = { props.handler } 
            name = {name1} element = {degrees[i]} />);
        }
        return majorGrid;
    };

    useEffect(() => { 
        fetch('http://localhost:8080/degreeStructures?code=' + props.user.degrees[props.user.degrees.length -1].code.toString()).then(
            response => response.json()).then(data => {
            console.log(props.user.degrees[props.user.degrees.length -1].code.toString());
            let degrees : any = setMajorHelper(data.degrees);
            setMajorGrid(degrees)
        });
    }, []);

    return (
        <div className = "RequestDegree">
            <div className = "requestDegreeHeadline">
                Select Your Degree Type
            </div>
            <div className = "RequestDegreeWrapper">
                {majorGrid}
            </div>
        </div>
    )
}

export default RequestDegreeType;