// NOTE - This file is testing 'functionality', testing - 'total updates' rather than component

import { render, screen } from '@testing-library/react';

// userEvent tries to simulate the real events that would happen in the browser as the user interacts with it
// Fire events works the same way the userEvent does
// NOTE: Most projects have a few use cases for 'fireEvent',
// but the majority of the time you should probably use 'userEvent' - @testing-library/user-event
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

// NOTE - we want in general try to render SMALLER component
// which will give us everything we need just to keep our test performent
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('updates scoop subtotal when scoops change', async () => {
  // NOTE: 'wrapper' is to wrap component with DATA provider
  // It can be Context Provider or Redux Provider
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  // 1. make sure total starts out $0.00
  // since scoop is a display element, we are going to just find it by 'text' & options object
  // it doesn't have any particular role on the page
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false }); // default by true
  // Doing { exact: false }, now this will find an element even if it is not an ENTIRE STRING
  // NOTE: { exact: false } DOEST NOT work or is NOT an option for *byRole

  // passing partial text content - '0.00'
  // if it contains anywhere, this assertion will succeed, otherwise it will fail
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // 2. update vanilla scoops to 1 and check the subtotal
  // input where you enter number & click button to increase or decrease value
  // known as Spin button which has a role of 'spinbutton'
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  // using await find since we are getting data from the server

  // NOTE: first thing when we update a text element is to clear an element - clear(element)
  // because we don't know what's been in it before
  // In this case, it will probably will start out at 0 but we don't know where
  // it is going to put a CURSOR, before the 0 or after the 0,
  // we don't want to enter at 1 & end up with 10 because there's 0 after it
  userEvent.clear(vanillaInput); // to clear existing text

  // second - after above, we will write/type into the element with type(element, text, [options])
  // and give it a text - string
  // NOTE: userEvent.type REQUIRES STRING, not number
  userEvent.type(vanillaInput, '1'); // .type to enter a number, passing string
  expect(scoopsSubtotal).toHaveTextContent('2.00'); // 1 scoop === $2

  // 3. update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });

  userEvent.clear(chocolateInput); // to clear existing text
  userEvent.type(chocolateInput, '2'); // to to enter a number
  // adding $4 for 2 scoops to subtotal of $2 above of one scoop, makes new subtotal === $6
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('updates toppings subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />, { wrapper: OrderDetailsProvider });

  // 1. make sure total starts out $0.00
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  // 2. select to add cherries topping and check the subtotal
  const selectCherries = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });

  userEvent.click(selectCherries);
  expect(toppingsTotal).toHaveTextContent('1.50');

  // 2. select to add hot fudge topping and check the subtotal
  const selectHotfudge = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });
  userEvent.click(selectHotfudge);
  expect(toppingsTotal).toHaveTextContent('3.00');

  // 3. select to remove hot fudge topping again
  userEvent.click(selectHotfudge);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

// GRAND TOTAL
// This one is not going to have just ONE FLOW, each of the Test is going to have different flow
// So, will use 'describe' to group tests them together
describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    // Test that the total starts out at $0.00
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('0.00');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    // add cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    // grand total $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    // remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    // check grand total
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries and check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
