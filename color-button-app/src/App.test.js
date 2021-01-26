import { render, screen } from '@testing-library/react';
import App from './App';

// screen is global object to access virtual DOM
test('renders learn react link', () => {
  // render method creates a virtual DOM for whatever JSX we pass as an argument - App
  render(<App />);

  // calling screen object's method - getByText
  // This is going to find an element in the DOM based on whatever 'text' is displaying. 
  // find element by display text

  // NOTE: use getByRole for interactive elements
  // first arg is the role itself, <a> element has a built in role of 'link'
  // second arg with NAME OPTION OBJECT to identify what the 'display text' should be for the link
  // NOTE: This is the way to use actual ROLE to find the element instead of just using the 'text'
  // & make accessible to users. 
  const linkElement = screen.getByRole('link', { name: /learn react/i }); // argument here is regular expression
  // The string 'learn react' is case in-sensitive (i), means letters could be upper/lower case. 
  // If we don't want to use regular expression (/learn react/i), we can use actual string like this - 'Learn React'

  // assertions - causes test to succeed or fail
  // expect - is Jest global, starts the assertion
  // (element) - expect argument, subject of the assertion
  // .toBeInTheDocument() - matcher, type of assertion from Jest-DOMaa
  expect(linkElement).toBeInTheDocument(); // matcher optionally takes arg - refines matcher
  // toBeInTheDocument is the DOM based matcher which only applies in the virtual DOM
});
