import { useState } from 'react';

import './App.css';

// function
export function replaceCamelWithSpaces(colorName) {
  // regular expression - if there's a capital letter one or more in the middle of the word
  // proceeded by SPACE
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

// console.log(replaceCamelWithSpaces('Red')); // Red
// console.log(replaceCamelWithSpaces('MidnightBlue')); // Midnight Blue
// console.log(replaceCamelWithSpaces('MediumVioletRed')); // Medium Violet Red

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [disabled, setDisabled] = useState(false);

  // if button color is red, set color text to blue otherwise red
  const colorText = buttonColor === 'red' ? 'blue' : 'red';

  const buttonStyle = {
    backgroundColor: disabled ? 'grey' : buttonColor,
  };

  const handleChange = e => {
    // console.log(e);
    // console.log(e.target.checked);
    setDisabled(e.target.checked);
  };

  const handleClickBlue = e => {
    setButtonColor(colorText);
  };

  return (
    <div className='App'>
      <button style={buttonStyle} onClick={handleClickBlue} disabled={disabled}>
        Change to {colorText}
      </button>

      <div>
        <input
          type='checkbox'
          id='disable-button-checkbox'
          defaultChecked={disabled}
          aria-checked={disabled}
          onChange={handleChange}
        />
        <label htmlFor='disable-button-checkbox'>Disable button</label>
      </div>
    </div>
  );
}

export default App;
