import { ThemeProvider } from 'styled-components';
import theme from './components/styles/theme.';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Container } from './components/styles/Container.styled';

import './App.css';

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
    <ThemeProvider theme={theme}>
      <>
        <Navbar links={navList} />
        <Container>
          <Outlet />
        </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
