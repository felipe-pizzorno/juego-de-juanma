import './App.css';
import {useState, memo} from 'react';

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

export const HeaderMemo = memo(Header);

