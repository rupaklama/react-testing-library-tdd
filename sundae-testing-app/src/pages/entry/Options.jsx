import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../components/AlertBanner';
import { Fragment } from 'react';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

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

  // title - capitalizing the first letter
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  // render particular component with data
  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  if (error) {
    return <AlertBanner />;
  }

  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </Fragment>
  );
};

export default Options;
