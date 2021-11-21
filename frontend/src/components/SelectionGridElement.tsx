import './styles/SelectionGridElement.css'

type SelectionGridProps = {
    name: string;
    onClick: () => void;
    className: string;
}

const SelectionGridElement = (props : SelectionGridProps) => {
  return (
        <button className = {props.className} onClick = {() => props.onClick()}>
            <span className = "degreeName">
                {props.name}
            </span>
        </button>
  )
}

export default SelectionGridElement
