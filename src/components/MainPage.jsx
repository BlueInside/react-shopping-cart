import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import useDataFetching from '../hooks/useDataFetching';
import Carousel from './Carousel';
import { StyledMain } from './styles/Main.styled';
import LoadingSpinner from './styles/LoadingSpinner.styled';

function MainPage() {
  const navigate = useNavigate();

  const { data, error, loading } = useDataFetching();

  if (loading || !data) return <LoadingSpinner />;
  if (error) return <p role="error">Error</p>;
  return (
    <StyledMain>
      <h1>Diverse Delights</h1>
      {data && <Carousel images={data.slice(0, 10)} />}
      <Button handleClick={() => navigate('/shop')} label={'Discover more'} />
    </StyledMain>
  );
}

export default MainPage;
