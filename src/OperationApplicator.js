import './App.css';

const opMapping = {
    "+": (value, x) => x + value,
    "%": (value, x) => x / value,
    "X": (value, x) => x * value,
    "-": (value, x) => x - value
}

export function OperationApplicator({operation, value, id, deleteElem, applyOperation, style}){
  const Button = ({onClick, text}) => (
    <span unselectable="on"
          style={{...style, userSelect: "none", backgroundColor: "transparent", cursor: "pointer"}}
          onClick={onClick}>{text}</span>
  )

  const op = opMapping[operation].bind(null, value);

  return (
    <div className="apply-op">
      <p style={{marginBottom: "7px"}}><span style={{fontSize: "30px"}}>{operation} {value}</span></p>
      <Button onClick={() => applyOperation(op)} text="apply"/> <Button onClick={deleteElem} text="delete" style={{marginLeft: "10px"}}/>
    </div>
  )
}

