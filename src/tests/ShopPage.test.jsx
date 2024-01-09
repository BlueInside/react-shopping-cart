import { render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShopPage from '../components/ShopPage';
import userEvent from '@testing-library/user-event';
let fetchedData;
beforeEach(() => {
  fetchedData = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      price: 22.3,
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
      category: "men's clothing",
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: { rate: 4.1, count: 259 },
    },
    {
      id: 3,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      description:
        'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      rating: { rate: 4.7, count: 500 },
    },
    {
      id: 4,
      title: 'Mens Casual Slim Fit',
      price: 15.99,
      description:
        'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      rating: { rate: 2.1, count: 430 },
    },
    {
      id: 5,
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: 'jewelry',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      rating: { rate: 4.6, count: 400 },
    },
    {
      id: 6,
      title: 'Solid Gold Petite Micropave',
      price: 168,
      description:
        'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
      category: 'jewelry',
      image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      rating: { rate: 3.9, count: 70 },
    },
    {
      id: 7,
      title: 'White Gold Plated Princess',
      price: 9.99,
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: 'jewelry',
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      rating: { rate: 3, count: 400 },
    },
    {
      id: 8,
      title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
      price: 10.99,
      description:
        'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
      category: 'jewelry',
      image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
      rating: { rate: 1.9, count: 100 },
    },
    {
      id: 9,
      title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
      price: 64,
      description:
        'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      rating: { rate: 3.3, count: 203 },
    },
  ];
});
describe('ShopPage component', () => {
  const mockFetchSuccessfully = () => {
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fetchedData);
        },
      });
    });
  };
  it('renders ShopPage correctly', () => {
    const { container } = render(<ShopPage />);
    expect(container).toMatchSnapshot();
  });
  it('displays 9 ProductCard items', async () => {
    mockFetchSuccessfully();

    render(<ShopPage />);

    const productCards = await screen.findAllByRole('productCard');
    expect(productCards).toHaveLength(fetchedData.length);
  });

  it('displays loading during fetch', async () => {
    globalThis.fetch = vi.fn(() => new Promise(() => {}));

    render(<ShopPage />);

    await waitFor(() => {
      const loadingText = screen.getByText('Loading...');
      expect(loadingText).toBeInTheDocument();
    });
  });

  it('displays error on fetch error', async () => {
    globalThis.fetch = vi.fn(() => {
      return Promise.reject(
        new Error('Something went wrong during product fetch')
      );
    });

    render(<ShopPage />);

    await waitFor(() => {
      const errorText = screen.queryByText(
        'Oops! Something went wrong. Please try again later.'
      );
      expect(errorText).toBeInTheDocument();
    });
  });

  it('Sorts products A-Z', async () => {
    mockFetchSuccessfully();

    const user = userEvent.setup();
    render(<ShopPage />);

    // Products cards in default order
    const unsortedProductCards = await screen.findAllByRole('productCard');

    // Sorts products title A-Z
    const productsSortedAZ = [...unsortedProductCards]
      .map((card) => within(card).getByRole('productTitle').textContent)
      .sort((a, b) => a.localeCompare(b));

    // Finds sort button
    const sortButton = await screen.findByRole('filter');

    // Opens up the filters dropdown
    await user.click(sortButton);

    // Sort cards A-Z
    const sortOptionAZ = screen.getAllByRole('filterOption')[0];
    await user.click(sortOptionAZ);

    // Checks if sorts match
    await waitFor(async () => {
      const sortedProductCards = await screen.findAllByRole('productCard');
      const sortedProductTitles = sortedProductCards.map(
        (card) => within(card).getByRole('productTitle').textContent
      );
      expect(sortedProductTitles).toEqual(productsSortedAZ);

      // Logs elements order
      console.log('AZ: ', sortedProductTitles, productsSortedAZ);
      screen.debug(screen.getAllByRole('productTitle'));
    });

    // Sorts products title A-Z
    const productsSortedHighLow = [...unsortedProductCards]
      .map((card) => within(card).getByRole('productTitle').textContent)
      .sort((a, b) => b.localeCompare(a));

    await user.click(sortButton);

    // Sort cards Z-A
    const sortOptionZA = screen.getAllByRole('filterOption')[1];
    await user.click(sortOptionZA);

    // Checks if sorts match
    await waitFor(async () => {
      const sortedProductCards = await screen.findAllByRole('productCard');
      const sortedProductTitles = sortedProductCards.map(
        (card) => within(card).getByRole('productTitle').textContent
      );
      expect(sortedProductTitles).toEqual(productsSortedHighLow);

      // Logs elements order ZA
      console.log('ZA: ', productsSortedHighLow);
      screen.debug(screen.getAllByRole('productTitle'));
    });
  });

  it('Sorts product cards by titles Z-A', async () => {
    mockFetchSuccessfully();

    const user = userEvent.setup();
    render(<ShopPage />);

    // Products cards in default order
    const unsortedProductCards = await screen.findAllByRole('productCard');

    // Sorts products title Z-A
    const productsSortedZA = [...unsortedProductCards]
      .map((card) => within(card).getByRole('productTitle').textContent)
      .sort((a, b) => b.localeCompare(a));

    // Finds sort button
    const sortButton = await screen.findByRole('filter');

    // Opens up the filters dropdown
    await user.click(sortButton);

    // Sort cards Z-A
    const sortOptionZA = screen.getAllByRole('filterOption')[1];
    await user.click(sortOptionZA);

    // Checks if sorts match
    await waitFor(async () => {
      const sortedProductCards = await screen.findAllByRole('productCard');
      const sortedProductTitles = sortedProductCards.map(
        (card) => within(card).getByRole('productTitle').textContent
      );
      expect(sortedProductTitles).toEqual(productsSortedZA);

      // Logs elements order
      console.log('ZA: ', productsSortedZA);
      screen.debug(screen.getAllByRole('productTitle'));
    });
  });

  it('Sorts products by price low-high', async () => {
    mockFetchSuccessfully();

    const user = userEvent.setup();
    render(<ShopPage />);

    // Products cards in default order
    const unsortedProductCards = await screen.findAllByRole('productCard');

    // Sorts products by price low-high
    const productsSortedZA = [...unsortedProductCards]
      .map((card) => within(card).getByRole('productPrice').textContent)
      .sort((a, b) => Number(a) - Number(b));

    // Finds sort button
    const sortButton = await screen.findByRole('filter');

    // Opens up the filters dropdown
    await user.click(sortButton);

    // Sort cards low-high
    const sortOptionLowHigh = screen.getAllByRole('filterOption')[2];
    await user.click(sortOptionLowHigh);

    // Checks if sorts match
    await waitFor(async () => {
      const sortedProductCards = await screen.findAllByRole('productCard');
      const sortedProductTitles = sortedProductCards.map(
        (card) => within(card).getByRole('productPrice').textContent
      );
      expect(sortedProductTitles).toEqual(productsSortedZA);

      // Logs elements order
      console.log('LowHigh: ', productsSortedZA);
      screen.debug(screen.getAllByRole('productPrice'));
    });
  });

  it('Sorts products by price high-low', async () => {
    mockFetchSuccessfully();

    const user = userEvent.setup();
    render(<ShopPage />);

    // Products cards in default order
    const unsortedProductCards = await screen.findAllByRole('productCard');

    // Sorts products by price high-low
    const productsSortedHighLow = [...unsortedProductCards]
      .map((card) => within(card).getByRole('productPrice').textContent)
      .sort((a, b) => Number(b) - Number(a));

    // Finds sort button
    const sortButton = await screen.findByRole('filter');

    // Opens up the filters dropdown
    await user.click(sortButton);

    // Sort cards low-high
    const sortOptionHighLow = screen.getAllByRole('filterOption')[3];
    await user.click(sortOptionHighLow);

    // Checks if sorts match
    await waitFor(async () => {
      const sortedProductCards = await screen.findAllByRole('productCard');
      const sortedProductTitles = sortedProductCards.map(
        (card) => within(card).getByRole('productPrice').textContent
      );
      expect(sortedProductTitles).toEqual(productsSortedHighLow);

      // Logs elements order
      console.log('HighLow: ', productsSortedHighLow);
      screen.debug(screen.getAllByRole('productPrice'));
    });
  });
});
