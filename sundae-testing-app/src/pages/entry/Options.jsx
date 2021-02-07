import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../components/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    let isMounted = true;

    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => {
        if (isMounted) {
          setItems(response.data);
        }
      })
      .catch(err => {
        // TODO: handle error response
        if (isMounted) {
          setError(true);
        }
      });

    // clean up
    return () => (isMounted = false);
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  // components to render based on prop - optionType
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  // render particular component with data
  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if (error) {
    return <AlertBanner />;
  }

  return <Row>{optionItems}</Row>;
};

export default Options;
