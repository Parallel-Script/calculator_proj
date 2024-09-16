import React, { useState } from "react";
import "./App.css"; // Add your custom styles here

function App() {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const calculate = () => {
    try {
      setDisplay(Function('"use strict";return (' + display + ')')().toString());
    } catch {
      setDisplay("Error");
    }
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const handleSquare = () => {
    try {
      setDisplay(Math.pow(eval(display), 2).toString());
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <h2>Calculator</h2>
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            value={display}
            readOnly
          />
          <div className="row mt-3">
            {/* Row 1 */}
            <button onClick={clearDisplay} className="btn btn-danger col-3">AC</button>
            <button onClick={() => handleClick('%')} className="btn btn-secondary col-3">%</button>
            <button onClick={() => handleClick('/')} className="btn btn-secondary col-3">/</button>
            <button onClick={() => handleClick('*')} className="btn btn-secondary col-3">*</button>
            
            {/* Row 2 */}
            <button onClick={() => handleClick('7')} className="btn btn-light col-3">7</button>
            <button onClick={() => handleClick('8')} className="btn btn-light col-3">8</button>
            <button onClick={() => handleClick('9')} className="btn btn-light col-3">9</button>
            <button onClick={() => handleClick('-')} className="btn btn-secondary col-3">-</button>

            {/* Row 3 */}
            <button onClick={() => handleClick('4')} className="btn btn-light col-3">4</button>
            <button onClick={() => handleClick('5')} className="btn btn-light col-3">5</button>
            <button onClick={() => handleClick('6')} className="btn btn-light col-3">6</button>
            <button onClick={() => handleClick('+')} className="btn btn-secondary col-3">+</button>

            {/* Row 4 */}
            <button onClick={() => handleClick('1')} className="btn btn-light col-3">1</button>
            <button onClick={() => handleClick('2')} className="btn btn-light col-3">2</button>
            <button onClick={() => handleClick('3')} className="btn btn-light col-3">3</button>
            <button onClick={handleSquare} className="btn btn-secondary col-3">x²</button>

            {/* Row 5 */}
            <button onClick={() => handleClick('0')} className="btn btn-light col-6">0</button>
            <button onClick={() => handleClick('.')} className="btn btn-light col-3">.</button>
            <button onClick={calculate} className="btn btn-primary col-3">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
