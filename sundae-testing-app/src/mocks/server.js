
// In the server.js file we are going to create a server instance with
// our request handlers defined earlier in handlers.js

// server.js file we are going to create a server instance with our request handlers
// Import setupServer function from the msw package and create a server instance with previously defined request handlers
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
// Here we are running setupServer with our handlers, pass in as new array with Spread operator
export const server = setupServer(...handlers);

// note: Final Task is to configure Create React App's - setupTests.js file
// So that, 'mock service worker' will intercept the network requests &
// return the responses from our test handlers.
