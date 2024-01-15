import { useEffect, useState } from 'react';

function useDataFetching() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `https://fakestoreapi.com/products`;

  useEffect(() => {
    fetch(url, {
      mode: 'cors',
    })
      .then((response) => {
        //Throws error if response status is not ok
        if (!response.ok) {
          setData(null);
          setLoading(false);
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((response) => {
        setData(response);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [url]);
  return { data, error, loading };
}

export default useDataFetching;
