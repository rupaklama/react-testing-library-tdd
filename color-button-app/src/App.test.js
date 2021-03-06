import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

// screen is global object to access virtual DOM

test('button has correct initial color', () => {
  // render method creates a virtual DOM for whatever JSX we pass as an argument - App
  // we want to render App component
  render(<App />);

  // need to find an element
  // We are going to use global object Screen that has access to virtual DOM created by render method.

  // NOTE: Let's find it by ROLE which is always the preferred method to make sure our app is Accessible.
  // NOTE: use getByRole for interactive elements
  // first arg is the role itself, <a> element has a built in role of 'link'
  // second arg with NAME OPTION OBJECT to identify what the 'display text' should be for the link
  // NOTE: This is the way to use actual ROLE to find the element instead of just using the 'text'
  // & make accessible to users.

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: /change to blue/i });

  // NOTE: if not sure, what the element's ROLE suppose to be or Unable to find an accessible element with the role
  // The test console helps us by giving hints for the ROLE on that particular element.

  // expect the background color to be red
  // toHaveStyle(css: string | object) - args can be String or Object
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // interacting with DOM
  // fireEvent object will help us to interact with elements in virtual DOM
  // to simulate click button - button is being clicked
  fireEvent.click(colorButton); // first arg is an Element,

  // after button is being clicked, expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // expect the button text to be 'Change to red' after button gets clicked
  expect(colorButton).toHaveTextContent('Change to red');
});

// Button starts out 'enabled' & checkbox start 'unchecked'
test('initial conditions', () => {
  render(<App />);
  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  // 'not' is part of jest assertion to negate (change)
  expect(checkbox).not.toBeChecked();
})

// when the checkbox is checked, button should be disabled
test('when the checkbox is checked, button should be disabled and enabled on second click', () => {
  render(<App />);

  // find button
  const button = screen.getByRole('button');
  
  // find checkbox by it's label, very useful when there are lots of checkbox
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});

  // when checkbox is clicked, button should be disabled
  // fireEvent to simulate click
  fireEvent.click(checkbox); 
  expect(button).toBeDisabled();
  // on disable, button color is gray
  expect(button).toHaveStyle({ backgroundColor: 'grey' });

  // Again when checkbox is clicked, button should be enabled
  fireEvent.click(checkbox); 
  expect(button).toBeEnabled();
  // on enable, button color is red
  expect(button).toHaveStyle({ backgroundColor: 'red' });
});

// unit testing
// describe statement - to group tests
describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letter', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})



//test('renders learn react link', () => {
// render method creates a virtual DOM for whatever JSX we pass as an argument - App
//render(<App />);

// calling screen object's method - getByText
// This is going to find an element in the DOM based on whatever 'text' is displaying.
// find element by display text

// NOTE: use getByRole for interactive elements
// first arg is the role itself, <a> element has a built in role of 'link'
// second arg with NAME OPTION OBJECT to identify what the 'display text' should be for the link
// NOTE: This is the way to use actual ROLE to find the element instead of just using the 'text'
// & make accessible to users.
//const linkElement = screen.getByRole('link', { name: /learn react/i }); // argument here is regular expression
// The string 'learn react' is case in-sensitive (i), means letters could be upper/lower case.
// If we don't want to use regular expression (/learn react/i), we can use actual string like this - 'Learn React'

// assertions - causes test to succeed or fail
// expect - is Jest global, starts the assertion
// (element) - expect argument, subject of the assertion
// .toBeInTheDocument() - matcher, type of assertion from Jest-DOM
// expect(linkElement).toBeInTheDocument(); // matcher optionally takes arg - refines matcher
// toBeInTheDocument is the DOM based matcher which only applies in the virtual DOM
// });
