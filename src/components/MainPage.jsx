import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import useDataFetching from '../hooks/useDataFetching';
import Carousel from './Carousel';
import { StyledMain } from './styles/Main.styled';

function MainPage() {
  const navigate = useNavigate();

  const { data, error, loading } = useDataFetching();

  if (loading || !data) return <p role="loader">Loading...</p>;
  if (error) return <p role="error">Error</p>;
  return (
    <StyledMain>
      <h1>Trend Tribe: Join the Fashion Revolution</h1>
      {data && <Carousel images={data.slice(0, 3)} />}
      <Button handleClick={() => navigate('/shop')} label={'Discover more'} />
    </StyledMain>
  );
}

export default MainPage;
