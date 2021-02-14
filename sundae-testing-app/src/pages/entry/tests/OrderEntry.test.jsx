import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../OrderEntry';

// to override handlers to get Error Response from mock server,
import { rest } from 'msw';

// need to import our mock server
import { server } from '../../../mocks/server';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('handles error for scoops and topping routes', async () => {
  // override handlers to get Error Response from mock server
  // we are going to use mock server's method - reset handlers
  // Rest handlers method takes handlers as arguments & it will just RESET
  // any handlers that have those endpoints for the server.
  server.resetHandlers(
    // Two args
    // First Arg here will be an handler that will return ERROR RESPONSE object from scoops endpoint
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      // Respond with "500 Internal Server Error" status for this test.
      res(ctx.status(500))
    ),
    // Second Arg here is similar as above but for toppings endpoint
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  // rendering our component
  render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  // When in need to wait for any period of time you can use 'waitFor'
  // Here, we want to wait until we have TWO alerts
  // waitFor - for multiple async requests responses
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

// dummy test
test.skip('not a real test', () => {});
