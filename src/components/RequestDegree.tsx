import React from 'react';
import "./styles/RequestDegree.css";
import DegreeGridElement from "./DegreeGridElement";

const RequestDegree = (props : any) => {

    // This function will make a request to the backend
    const requestDegrees = () => {
        return [{name: "CSSE23100000000000000000000000000000000", year: 2021}, {name: "Test", year: 2021}, {name: "CSSE2310", year: 2021}, 
        {name: "Test", year: 2021}, {name: "CSSE2310", year: 2021}, {name: "Test", year: 2021},
        {name: "CSSE2310", year: 2021}, {name: "Test", year: 2021}, {name: "CSSE2310", year: 2021}, {name: "Test", year: 2021}, {name: "TestTest", year: 2021}];
    }

    const allDegrees = requestDegrees();
    
    const searchDegrees = (degrees: any, search: string) => {
        //Make a reqeust to get the names and years of all degrees
        let lowerCaseSearch : string = search.toLowerCase();
        let newDegreeGrid = [];
        for (let i = 0; i < degrees.length; i++) {
            let degreeName: string = degrees[i].name.toLowerCase();
            if (degreeName.includes(lowerCaseSearch)) {
                newDegreeGrid.push(<DegreeGridElement onClick = { props.handler } name = {degrees[i].name} year = {degrees[i].year} />);
            }
        }
        return newDegreeGrid;
    }
    const [degree, setDegree] = React.useState("");
    const [degreeGrid, setDegreeGrid] = React.useState(searchDegrees(allDegrees, ""));

    const handleSubmission = (event: any) => {
        event.preventDefault();
    }

    const handleChange = (event: any) => {
        let newSearchValue : string = event.target.value;
        setDegree(newSearchValue)
        let newDegrees: any = searchDegrees(allDegrees, newSearchValue);
        setDegreeGrid(newDegrees);
    }

    return (
        <div className = "RequestDegree">
            <form onSubmit = { handleSubmission }>
                <label>
                    <input className = "degreeForm" value = {degree} type = "text" name = "degree" 
                    placeholder = "Search for your degree (e.g Science, Arts, Engineering)" onChange = { handleChange }/>
                </label>
            </form>
            <div className = 'DegreeGrid'>
                {degreeGrid}
            </div>
        </div>
    )
}

export default RequestDegree;