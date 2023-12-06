import { useEffect, useState } from 'react';

function useDataFetching() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  return { data, error };
}

export default useDataFetching;
