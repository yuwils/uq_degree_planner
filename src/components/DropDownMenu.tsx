import React, { useEffect } from 'react';
import SelectionGridElement from './SelectionGridElement';
import User from '../classes/user';
import './styles/DropDownMenu.css'

const DropDownMenu = (props : any) => {
    const [clicked, setClicked] = React.useState(false);
    const [fullList, setFullList] = React.useState([]);
    const [currentList, setList] = React.useState([]);
    const [display, setDisplay] = React.useState("Click to select your " + props.type);
    const [major, setMajor] = React.useState("");
    const [selected, setSelected] = React.useState(false);

    const toggleClicked = () => {
        if (!selected) {
            if (!clicked) {
                setDisplay("Click to hide these " + props.type + "s");
            } else {
                setDisplay("Click to select your " + props.type);
            }
        }
        setClicked(!clicked);
    };

    const searchMajors = (fullList : any, search : string) => {
        let lowerCaseSearch : string = search.toLowerCase();
        let newDegreeGrid = [];
        console.log(fullList);
        for (let i = 0; i < fullList.length; i++) {
            let degreeName: string = fullList[i].name.toLowerCase();
            if (degreeName.includes(lowerCaseSearch)) {
                newDegreeGrid.push(<SelectionGridElement className = "majorSelection" user = {props.user} onClick = { handleClickBack } 
                name = {props.elements[i].name} element = {props.elements[i]} />);
            }
        }
        return newDegreeGrid;
    }

    const handleSubmission = (event: any) => {
        event.preventDefault();
    }

    const handleChange = (event: any) => {
        console.log(event.target.value)
        let newDegrees: any = searchMajors(fullList, event.target.value);
        setList(newDegrees);
    };

    const handleClickBack = (user : User, majorDetails : any) => {
        let currentMajor = major;
        let exists = props.handler(user, currentMajor, majorDetails.code, majorDetails.name, props.type);
        if (exists) {
            setDisplay(majorDetails.name);
            setMajor(majorDetails.code);
            setSelected(true);
            setClicked(false);
        }
    }

    useEffect(() => { 
        let nfullList : any = [];
        for (let i = 0; i < props.elements.length; i++) {
            nfullList.push(<SelectionGridElement className = "majorSelection" user = {props.user} onClick = { handleClickBack } 
            name = {props.elements[i].name} element = {props.elements[i]}/>)
        }
        setFullList(props.elements);
        setList(nfullList);
    }, [props]);

    if (!clicked) {
        return (
        <div>
            <button className = "DropDownMenu" onClick = { toggleClicked }> 
                {display}
            </button>
        </div>
        )
    } else {
        return (
        <div>
            <button className = "DropDownMenu" onClick = { toggleClicked }> 
                {display}
            </button>
            <div className = "extension">
            <form onSubmit = { handleSubmission }>
                <label>
                    <input className = "majorForm" type = "text" name = "major" 
                    placeholder = {"Search for your " + props.type} onChange = { handleChange }/>
                </label>
            </form>
            { currentList }
            </div>
        </div>
        )
    }
}

export default DropDownMenu;