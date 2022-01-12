import './App.css';
import {OperationForm} from './OperationForm.js';
import {Operations} from './Operations.js';
import {OperationApplicator} from './OperationApplicator.js';
import {HeaderMemo} from './Header.js';
import React, {useState} from 'react';

function useAppState() {
  const [operationApplicators, setOperationApplicators] = useState([]);
  const [currentValue, setCurrentValue] = useState(10);
  const [currentOp, setCurrentOp] = useState("+");

  const applyOperation = (functor) => { 
    const lowerBound = 0.001;
    const newValue = functor(currentValue);
    setCurrentValue(newValue > lowerBound ? newValue : 0);
  }

  const addOperation = (currentOpValue) => { 
    const newApplicators = [...operationApplicators, {operation: currentOp, value: currentOpValue}];
    setOperationApplicators(newApplicators);
  }

  const deleteOperation = (index) => { 
    const newApplicators = [...operationApplicators];
    newApplicators.splice(index, 1);
    setOperationApplicators(newApplicators);
  }

  return {applyOperation, addOperation, deleteOperation, currentOp,
          setCurrentOp, currentValue, operationApplicators};
}

function App() {
  const {applyOperation, addOperation, deleteOperation, currentOp,
         setCurrentOp, currentValue, operationApplicators} = useAppState();
  const flexStyle = {display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"};

  return (
    <div className="app">
      <HeaderMemo />
      <Operations displayStyle={flexStyle} currentOp={currentOp} setCurrentOp={setCurrentOp} />

      <div style={{marginTop: "40px", display: "flex", justifyContent: "space-evenly"}}>
        <OperationForm onClick={addOperation} />

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
