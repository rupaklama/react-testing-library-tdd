import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

// render method creates a virtual DOM for whatever JSX we pass as an argument
// screen is global object to access virtual DOM
// fireEvent object is to simulate an event like click

test('initial conditions', () => {
  // we want to render SummaryForm component with render method
  render(<SummaryForm />);

  // To find an element using global object 'Screen' that has access to virtual DOM created by render method

  // NOTE: Let's find it by ROLE which is always the preferred method to make sure our app is Accessible.
  // NOTE: use getByRole for interactive elements - getByRole('button', {name: /submit/i})
  // first arg is the role itself, second arg with NAME OPTION OBJECT to identify what the 'display text'
  // should be for the link - optional

  // 1. Checkbox starts out 'unchecked' by default
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i, // using label to specifically target this particular checkbox
  });
  expect(checkbox).not.toBeChecked(); // 'not' is part of jest assertion to negate (change)

  // NOTE: if not sure, what the element's ROLE suppose to be or Unable to find an accessible element with the role
  // The test console helps us by giving hints for the ROLE on that particular element.
  // Just write you guess for role in the argument - getByRole('check may be')

  // 2. checking checkbox enables button
  // find button first & make sure its disabled
  const button = screen.getByRole('button', { name: /confirm order/i });
  expect(button).toBeDisabled();

  // fireEvent to simulate click
  // when checkbox is clicked, button should be disabled
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  // 3. un-checking checkbox again disables button
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});

// NOTE: Testing POPOVER to test how element gets disappeared from a page
