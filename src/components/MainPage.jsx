import Button from '../components/Button';
import useDataFetching from '../hooks/useDataFetching';

function MainPage() {
  const { data, error, loading } = useDataFetching(3);
  if (error) return <p role="error">Error</p>;

  return (
    <main>
      <h1>Trend Tribe: Join the Fashion Revolution</h1>
      <div>
        {loading && <p role="status">Loading...</p>}
        {data &&
          data.map((item) => {
            return <img key={item.id} src="#" />;
          })}
      </div>
      <Button label={'Discover more'} />
    </main>
  );
}

export default MainPage;
