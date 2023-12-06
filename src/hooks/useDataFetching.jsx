import { useEffect, useState } from 'react';

function useDataFetching() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);
  return { data };
}

export default useDataFetching;
