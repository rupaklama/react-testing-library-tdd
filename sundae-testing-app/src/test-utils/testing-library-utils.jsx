import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

// Creating Custom Render wrapped with WRAPPER to access Context state or Redux state
// first arg 'ui' - jsx component, second arg is options object
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-exporting everything because we might be importing something other than 'render'
// for example 'screen'

// we will over-ride render method with renderWithContext
export { renderWithContext as render };

// NOTE: so now if we want to render any component with CONTEXT OR REDUX
// we will import RENDER from this file
