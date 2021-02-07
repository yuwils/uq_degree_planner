import React, { useEffect } from 'react';
import "./styles/RequestDegree.css";
import SelectionGridElement from "./SelectionGridElement";

const RequestDegree = (props : any) => {
    const [allDegrees, setAllDegrees] = React.useState([]);

    // This function will make a request to the backend
    const requestDegrees = () => {
        console.log('requested')
        fetch('http://localhost:8080/singleDegrees').then(response => response.json()).then(data => {
            console.log('degreesRequested');
            setAllDegrees(data.degrees)});
    }

    useEffect(() => {
        requestDegrees()
    }, []);

    const searchDegrees = (degrees: any, search: string) => {
        let lowerCaseSearch : string = search.toLowerCase();
        let newDegreeGrid = [];
        for (let i = 0; i < degrees.length; i++) {
            let degreeName: string = degrees[i].name.toLowerCase();
            if (degreeName.includes(lowerCaseSearch)) {
                newDegreeGrid.push(<SelectionGridElement onClick = { props.handler } name = {degrees[i].name} />);
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