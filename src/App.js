import './App.css';
import React, { useState } from 'react';

function Header() {
  const isValidColor = candidateColor => /[0-9A-Fa-f]{6}/i.test(candidateColor); 
  const [colorInput, setColorInput] = useState("");
  const color = isValidColor(colorInput) ? colorInput : "0000FF";

  return (
    <>
      <input maxLength="6"
             size="4"
             className="input-field"
             value={colorInput}
             style={{marginRight: "20px"}}
             onChange={e => setColorInput(e.target.value)}/>
      <span style={{color: "#" + color, fontWeight: "bold", fontSize: "25px"}}>EL JUEGO DE JUANMA</span>
    </>
  )
}

function Operations({displayStyle, setCurrentOp, currentOp}) {
  return (
    <div style={{...displayStyle, marginTop: "30px"}}>
      {['X', '%', '-', '+'].map(symbol => (
        <div
          key={symbol}
          className="circled-op"
          onClick={() => {setCurrentOp(symbol)}}
          style={currentOp === symbol ? {backgroundColor: "orange"} : {}}>
          {symbol}
        </div>
      ))}
    </div>
  )
}

function OperationApplicator({operation, value, id, deleteElem, applyOperation, style}){
  const Button = ({onClick, text}) => (
    <span unselectable="on"
          style={{...style, userSelect: "none", backgroundColor: "transparent", cursor: "pointer"}}
          onClick={onClick}>{text}</span>
  )

  var op;
  switch(operation) {
    case "+":
      op = x => x + value;
      break;
    case "%":
      op = x => x / value;
      break;
    case "X":
      op = x => x * value;
      break;
    case "-":
      op = x => x - value;
      break;
  }

  return (
    <div className="apply-op">
      <p style={{marginBottom: "7px"}}><span style={{fontSize: "30px"}}>{operation} {value}</span></p>
      <Button onClick={() => applyOperation(op)} text="apply"/> <Button onClick={deleteElem} text="delete" style={{marginLeft: "10px"}}/>
    </div>
  )
}

function OperationForm({value, onChange, onClick}) {
  return (
    <div style={{width: "30%"}}>
      <input type="number" className="input-field add" value={value} onChange={e => onChange(parseInt(e.target.value))}/>
      <br/>
      <button
        className="input-field add"
        style={{marginTop: "15px", fontSize: "20px", cursor: "pointer"}}
        onClick={onClick}>
        ADD
      </button>
    </div>
  )
}

function useAppState() {
  const [operationApplicators, setOperationApplicators] = useState([]);
  const [currentValue, setCurrentValue] = useState(10);
  const [currentOp, setCurrentOp] = useState("+");
  const [currentOpValue, setCurrentOpValue] = useState(0);

  const applyOperation = (functor) => { 
    const lowerBound = 0.001;
    const newValue = functor(currentValue);
    setCurrentValue(newValue > lowerBound ? newValue : 0);
  }

  const addOperation = () => { 
    const newApplicators = [...operationApplicators, {operation: currentOp, value: currentOpValue}];
    setOperationApplicators(newApplicators);
  }

  const deleteOperation = (index) => { 
    const newApplicators = [...operationApplicators];
    newApplicators.splice(index, 1);
    setOperationApplicators(newApplicators);
  }

  return {applyOperation, addOperation, deleteOperation, currentOp,
          setCurrentOp, currentValue, currentOpValue,
          setCurrentOpValue, operationApplicators};
}

function App() {
  const {applyOperation, addOperation, deleteOperation, currentOp,
         setCurrentOp, currentValue, currentOpValue,
         setCurrentOpValue, operationApplicators} = useAppState();
  const flexStyle = {display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"};

  return (
    <div className="app">
      <Header />
      <Operations displayStyle={flexStyle} currentOp={currentOp} setCurrentOp={setCurrentOp} />

      <div style={{marginTop: "40px", display: "flex", justifyContent: "space-evenly"}}>
        <OperationForm value={currentOpValue} onChange={setCurrentOpValue} onClick={addOperation} />

        <div style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{margin: "auto", fontSize: "50px"}}>
            {currentValue}
          </div>
        </div>
      </div>

      <br/>

      <div style={flexStyle}>
        {operationApplicators.map((applicator, index) => ( 
          <OperationApplicator
            {...applicator}
            applyOperation={applyOperation}
            key={index}
            deleteElem={() => deleteOperation(index)} />))}
      </div>
    </div>
  );
}

export default App;
