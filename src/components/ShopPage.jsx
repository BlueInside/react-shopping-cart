import LoadingSpinner from './styles/LoadingSpinner.styled';
import { ProductsDisplay } from './styles/ShopPage.styled';
import { StyledFilterDropdown } from './styles/ShopPage.styled';

import useDataFetching from '../hooks/useDataFetching';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function ShopPage() {
  const [sortOption, setSortOption] = useState('default');

  let { data, loading, error } = useDataFetching();

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
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>Oops! Something went wrong. Please try again later.</div>;
  }
  return (
    <>
      <Outlet />
      <StyledFilterDropdown setSortOption={setSortOption} />
      <ProductsDisplay>
        {sortData(sortOption).map((product) => (
          <ProductCard
            product={{ ...product }}
            key={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
            description={product.description}
            rating={product.rating}
            category={product.category}
          />
        ))}
      </ProductsDisplay>
    </>
  );
}

export default ShopPage;
