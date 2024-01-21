import { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Container } from './components/styles/Container.styled';

import './App.css';

const theme = {
  colors: {
    primaryBlue: '#007BFF',
    primaryGreen: '#28A745',
    primaryYellow: '#FFC107',
    secondaryGrey: '#F8F9FA',
    secondaryDarkGrey: '#6C757D',
    secondaryWhite: '#FFFFFF',
    offWhite: '#F5F5F5',
    black: '#000000',
    errorRed: '#DC3545',
  },
};

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
