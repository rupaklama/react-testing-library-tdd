import { useState } from 'react';

import './App.css';



function App() {

  const [ buttonColor, setButtonColor] = useState('red');

  // if button color is red, set new button color to blue otherwise red
  const colorText = buttonColor === 'red' ? 'blue' : 'red';

  const buttonStyle = {
    backgroundColor: buttonColor
  }
  
  const handleClick = (e) => {
    e.preventDefault()

    setButtonColor(colorText)
  }

  return (
    <div className="App">
      <button style={buttonStyle} onClick={handleClick}>Change to {colorText}</button>
    </div>
  );
}

export default App;
