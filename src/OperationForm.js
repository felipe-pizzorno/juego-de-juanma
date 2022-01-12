import './App.css';
import {useState} from 'react';

export function OperationForm({onClick}) {
  const [currentOpValue, setCurrentOpValue] = useState(0);

  return (
    <div style={{width: "30%"}}>
      <input type="number" className="input-field add" value={currentOpValue} onChange={e => setCurrentOpValue(parseInt(e.target.value))}/>
      <br/>
      <button
        className="input-field add"
        style={{marginTop: "15px", fontSize: "20px", cursor: "pointer"}}
        onClick={() => onClick(currentOpValue)}>
        ADD
      </button>
    </div>
  )
}
