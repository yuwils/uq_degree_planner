import { useState, useEffect } from 'react';
import {MajorType, Major} from '../types/Types';
import SelectionGridElement from './SelectionGridElement';
import {selectLastMajors, selectLastMinors, selectLastExtendedMajors, removeMajorCode, addMajor} from '../reducers/UserReducer';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import './styles/DropDownMenu.css'

type DropDownProps = {
    type: MajorType;
    callback: (major: Major, prevMajorCode: string) => boolean,
    elements: Major[];
}

const DropDownMenu = (props : DropDownProps) => {
    const dispatch = useAppDispatch();

    // Whether the menu is open or not
    const [clicked, setClicked] = useState<boolean>(false);
    // All the majors for this menu
    const [fullList, setFullList] = useState<Major[]>(props.elements);
    // All the currently selected majors for this menu
    const [currentList, setList] = useState<Major[]>(props.elements);
    // What shows on the display menu
    const [display, setDisplay] = useState<string>("Click to select your " + props.type);
    // The current major code selected on this dropdown
    const [majorCode, setMajorCode] = useState<string>("");
    // Whether a major has been selected on this dropdown
    const [selected, setSelected] = useState<boolean>(false);

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

    const searchMajors = (fullList : Major[], search : string) => {
        let lowerCaseSearch = search.toLowerCase();
        let newDegreeGrid : Major[] = [];
        for (const major of fullList) {
            let majorName: string = major.name.toLowerCase();
            if (majorName.includes(lowerCaseSearch)) {
                newDegreeGrid.push(major);
            }
        }
        return newDegreeGrid;
    }

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectedMajors: Major[] = searchMajors(fullList, event.target.value);
        setList(selectedMajors);
    };

    useEffect(() => {
        setFullList(props.elements);
        setList(props.elements);
    }, [props.elements]);

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
            { currentList.map((major) => <SelectionGridElement key={major.name} className = "majorSelection" name = {major.name} onClick = {() => {
                const success = props.callback(major, majorCode);
                if (success) {
                    setDisplay(major.name);
                    setMajorCode(major.mcode);
                    setSelected(true);
                    setClicked(false);
                }
            } }/>) }
            </div>
        </div>
        )
    }
}

export default DropDownMenu;