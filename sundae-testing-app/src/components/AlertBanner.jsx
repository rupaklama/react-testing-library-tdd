import React from 'react';
import { Alert } from 'react-bootstrap';

const alertBackground = {
  color: 'black',
};
const AlertBanner = ({ message, variant }) => {
  // if message prop is truthy then just set that message as an arg
  // or message is falsey, set it to our default message here
  const alertMessage =
    message || 'An unexpected error occurred. Please try again later.';

  // same as above
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={alertBackground}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
