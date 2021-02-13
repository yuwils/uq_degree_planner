import React, { useEffect } from 'react';
import DropDownMenu from './DropDownMenu';
import SelectionGridElement from './SelectionGridElement';
import User from '../classes/user';
import './styles/RequestMajor.css';

const RequestMajor = (props: any) => {
    const [majorButtonGrid, setMajorButtonGrid] = React.useState([]);
    const [minorButtonGrid, setMinorButtonGrid] = React.useState([]);
    const [emajorButtonGrid, setEMajorButtonGrid] = React.useState([]);

    const majors = () => {
        let newButtonGrid : any = [];
        if (props.user.degrees[props.user.degrees.length - 1].majors > 0) {
            fetch('http://localhost:8080/majors?code=' + props.user.degrees[props.user.degrees.length -1].code.toString() + "&type=major").then(
                response => response.json()).then(data => {
                    let degrees : any = data.degrees;
                    for (let i = 0; i < props.user.degrees[props.user.degrees.length - 1].majors; i++) {
                        newButtonGrid.push(<DropDownMenu type = "Major" handler = {props.handler} user = {props.user} elements = {degrees} />);
                    }
                    setMajorButtonGrid(newButtonGrid);
            });
        }
    }

    const minors = () => {
        let newButtonGrid : any = [];
        if (props.user.degrees[props.user.degrees.length - 1].minors > 0) {
            fetch('http://localhost:8080/majors?code=' + props.user.degrees[props.user.degrees.length -1].code.toString() + "&type=minor").then(
                response => response.json()).then(data => {
                    let degrees : any = data.degrees;
                    for (let i = 0; i < props.user.degrees[props.user.degrees.length - 1].minors; i++) {
                        newButtonGrid.push(<DropDownMenu type = "Minor" handler = {props.handler} user = {props.user} elements = {degrees} />);
                    }
                    setMinorButtonGrid(newButtonGrid);
                });
        }
    }

    const emajors = () => {
        let newButtonGrid : any = [];
        if (props.user.degrees[props.user.degrees.length - 1].emaj > 0) {
            fetch('http://localhost:8080/majors?code=' + props.user.degrees[props.user.degrees.length -1].code.toString() + "&type=eMajor").then(
                response => response.json()).then(data => {
                    let degrees : any = data.degrees;
                    for (let i = 0; i < props.user.degrees[props.user.degrees.length - 1].emaj; i++) {
                        newButtonGrid.push(<DropDownMenu type = "Extended Major" handler = {props.handler} user = {props.user} elements = {degrees} />)
                    }
                    setEMajorButtonGrid(newButtonGrid);
                });
        }
    }

    useEffect(() => { 
        majors();
        minors();
        emajors();
    }, [props]);

    return (
        <div className = "buttonGrid">
            <div className = "buttonGridWrapper">
                {majorButtonGrid}
                {minorButtonGrid}
                {emajorButtonGrid}
                <SelectionGridElement className = "majorSelection" user = {props.user} onClick = { props.handler2 } 
                    name = {"Continue"} element = {""}/>
            </div>
        </div>
    )
}

export default RequestMajor;