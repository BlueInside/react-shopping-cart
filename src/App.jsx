import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  const navList = [
    {
      path: 'main',
      label: 'Main page',
    },
    {
      path: 'shop',
      label: 'Shop',
    },
    {
      path: 'cart',
      label: 'Cart',
    },
  ];
  return (
    <div>
      <Navbar links={navList} />
      <Outlet />
    </div>
  );
}

export default App;
