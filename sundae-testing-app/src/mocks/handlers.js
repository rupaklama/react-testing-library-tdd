import { rest } from 'msw';

// Response Resolver function is to specify a Mocked Response
// NOTE: This Handlers functions determine what will return for any particular url/route
export const handlers = [
  // get request
  // Response resolver is a function with (request, response, context) args
  // ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      // mocking response object is 'json data' that we get from server with Context object
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),

  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    );
  }),

  rest.post('http://localhost:3030/order', (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];
