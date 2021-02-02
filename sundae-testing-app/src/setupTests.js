// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Service Worker set up
// importing the server from the file we defined it
import { server } from './mocks/server.js';

// Establish API mocking before all tests.
// Basically saying - any network requests the come through route them to 'Mock Service Worker'
// instead of the actual network.
// Listen to our Mock Service Worker
beforeAll(() => server.listen());

// After each test, Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
