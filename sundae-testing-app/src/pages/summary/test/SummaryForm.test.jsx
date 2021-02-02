import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

// user-event tries to simulate the real events that would happen in the browser as the user interacts with it
// Fire events the same way the user does
// NOTE: Most projects have a few use cases for 'fireEvent',
// but the majority of the time you should probably use @testing-library/user-event
import userEvent from '@testing-library/user-event';

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

  // user-event tries to simulate the real events like click
  // when checkbox is clicked, button should be disabled
  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  // 3. un-checking checkbox again disables button
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

// NOTE: Testing POPOVER to test how element gets disappeared from a page

test('popover response to hover', async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  // note: using 'query/queryBy' since element not to be in DOM, Searching by 'text' to find a POPOVER
  // NOTE: queryBy returns 'null' if no match
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover/hover of checkbox label
  // we are going to simulate a mouseover, Searching by 'text' to find a POPOVER
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  // userEvent's hover method - Hovers over element
  // simulating mouse hover to display popover
  userEvent.hover(termsAndConditions);

  // check to see if our popover actually appears
  // this time we will use getBy, we expect an element to be in the DOM
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  // userEvent's un-hover method, simulating mouse unhover
  userEvent.unhover(termsAndConditions);
  // note: using 'query' since element not to be in DOM now

  // ERROR: popover is disappearing asynchronously after the above test is complete
  // https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance
  // waitForElementToBeRemoved async helper function is what we want
  // waitFor async helper function retries until the wrapped function stops throwing an error.
  // This can be used to assert that an element disappears from the page
  await waitForElementToBeRemoved(() =>
    // no expect statement here it acts assertion on its own
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
  // NOTE: We are making our assertion asyn here to solve issue with act-warning
  // where an element that was there and then disappeared.
});
