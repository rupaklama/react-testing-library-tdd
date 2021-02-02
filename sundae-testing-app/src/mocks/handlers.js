import { rest } from 'msw';

// NOTE: This Handlers functions determine what will return for any particular url/route
export const handlers = [
  // get request
  // Response resolver is a function with (request, response, context) args
  // ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response
  rest.get('http://localhost:3030/scoop', (req, res, ctx) => {
    return res(
      // mocking response object is 'json data' that we get from server with Context object
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
];
