import { render, screen } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

// options component
import Options from '../Options';

// test if it displays an image for each of the options return from the server
// using our Mock Server to mock the actual server
test('displays image for each scoop option from server', async () => {
  // render Options component with prop
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  // find the multiple images
  // 'scoop$' to indicate the letter 'scoop' will be at the end of the string
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  // our handler is returning Array of two 'Options Objects' as data from server
  expect(scoopImages).toHaveLength(2); // toHaveLength is jest assertion

  // being more specific on the images we find with alt text
  // confirm 'alt text' of images
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each toppings option from server', async () => {
  // Mock Service Worker will return three toppings from server
  render(<Options optionType='toppings'/>, { wrapper: OrderDetailsProvider });

  // find images, expect 3 based on what msw returns
  // 'topping$' to indicate the letter 'topping' will be at the end of the string
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  // check the actual alt text for the images
  const imageTitles = images.map(img => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
