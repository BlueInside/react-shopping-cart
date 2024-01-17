import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import useDataFetching from '../hooks/useDataFetching';

function MainPage() {
  const navigate = useNavigate();

  const { data, error, loading } = useDataFetching();

  if (loading || !data) return <p role="loader">Loading...</p>;
  if (error) return <p role="error">Error</p>;
  return (
    <main>
      <h1>Trend Tribe: Join the Fashion Revolution</h1>
      <div>
        {data &&
          data.slice(0, 3).map((item) => {
            return <img key={item.id} src={item.image} />;
          })}
      </div>
      <Button handleClick={() => navigate('/shop')} label={'Discover more'} />
    </main>
  );
}

export default MainPage;
