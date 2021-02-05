import React from 'react';
import "./styles/RequestDegree.css";

const RequestDegree = () => {
    const [degree, setDegree] = React.useState("");

    const handleSubmission = (event: any) => {
        console.log(degree)
        event.preventDefault();
        setDegree("");
    }

    const handleChange = (event: any) => {
        setDegree(event.target.value)
    }

    return (
        <div className = "RequestDegree">
            <form onSubmit = { handleSubmission }>
                <label>
                    <input className = "degreeForm" value = {degree} type = "text" name = "degree" 
                    placeholder = "Search for your degree (e.g Science, Arts, Engineering)" onChange = { handleChange }/>
                </label>
            </form>
            <div className = "Degrees">

            </div>
        </div>
    )
}

export default RequestDegree;