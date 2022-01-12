import './App.css';

export function Operations({displayStyle, setCurrentOp, currentOp}) {
  return (
    <div style={{...displayStyle, marginTop: "30px"}}>
      {['X', '%', '-', '+'].map(symbol => (
        <div
          key={symbol}
          className="circled-op"
          onClick={() => setCurrentOp(symbol)}
          style={currentOp === symbol ? {backgroundColor: "orange"} : {}}>
          {symbol}
        </div>
      ))}
    </div>
  )
}

