import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Happy Path test - also knowns as Happy Day or Golden Path test
// This is a test that execute Customer flow without an Error
// Here we are testing an Order Phase

// NOTE: We are NOT going to need our WRAPPER since we are rendering APP
// which already wraps everything in our Context Provider

test('order phases for happy path', async () => {
  // 1. render app
  render(<App />);

  // 2. create an order - add ice cream scoops & toppings
  // add ice cream scoops & toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput); // to clear if any remaining text
  userEvent.type(vanillaInput, '1'); // update scoop to 1
  // NOTE: TYPE requires a STRING

  // another scoop of chocolate
  // NOTE: NO NEED to make another 'await' since both the Tests relies on a single axios call
  // If Vanilla has shown up then chocolate will show up as well
  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  // Adding Topping
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);

  // 3. find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  // 4. check 'summary subtotals' based on order in Summary page
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  // scoop subtotal display
  const scoopHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopHeading).toBeInTheDocument();

  // topping subtotal display
  const toppingHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingHeading).toBeInTheDocument();

  // checking summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // 5. accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // 6. confirm order number on confirmation page
  // check confirmation page text
  // this one is async because there is a POST request to server in between summary and confirmation pages
  // once the post request is finished then we will display thank you message
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // 7. click 'new order' button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  // 8. check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Scoops total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  // 9. do we need to await anything to avoid test errors? e.g memory leak
  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over - memory leak
  // NOTE: Making sure that axios call is returned/exited before the test exits
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
