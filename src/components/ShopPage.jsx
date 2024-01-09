import useDataFetching from '../hooks/useDataFetching';
import ProductCard from './ProductCard';
import FilterDropdown from './FilterDropdown';

import { useState } from 'react';

function ShopPage() {
  const [sortOption, setSortOption] = useState('default');
  let { data, loading, error } = useDataFetching(9, sortOption);

  function sortData(option) {
    const sortedData = [...data];

    if (option === 'az') {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'za') {
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (option === 'lowHigh') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (option === 'highLow') {
      sortedData.sort((a, b) => b.price - a.price);
    }

    return sortedData;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops! Something went wrong. Please try again later.</div>;
  }
  return (
    <>
      <FilterDropdown setSortOption={setSortOption} />
      <div>
        {sortData(sortOption).map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
            description={product.description}
            onClick={() => {
              console.log('click');
            }}
          />
        ))}
      </div>
    </>
  );
}

export default ShopPage;
