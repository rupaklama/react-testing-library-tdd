import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  // console.log(items);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    let isMounted = true;

    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => {
        if (isMounted) {
          setItems(response.data)
        }
      })
      .catch(err => {
        // TODO: handle error response
        if (isMounted) {
          console.log(err.message);
        }
      });

      // clean up
      return () => isMounted = false;
      
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  // components to render based on prop - optionType
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  // render particular component with data
  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
