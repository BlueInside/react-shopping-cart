import Button from '../components/Button';
import useDataFetching from '../hooks/useDataFetching';

function MainPage() {
  const { data, error, loading } = useDataFetching();

  if (error) return <p role="error">Error</p>;
  return (
    <main>
      <h1>Trend Tribe: Join the Fashion Revolution</h1>
      <div>
        {loading && <p role="status">Loading...</p>}
        {data &&
          data.slice(0, 3).map((item) => {
            return <img key={item.id} src={item.image} />;
          })}
      </div>
      <Button label={'Discover more'} />
    </main>
  );
}

export default MainPage;
