import { useEffect } from 'react';
import useDataFetching from '../hooks/useDataFetching';
import ProductCard from './ProductCard';

function ShopPage() {
  const { data, loading, error } = useDataFetching(9);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      {data.map((product) => (
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
  );
}

export default ShopPage;
