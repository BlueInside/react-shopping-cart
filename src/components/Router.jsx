import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from './MainPage';
import ShopPage from './ShopPage';
import ShoppingCart from './ShoppingCart';
import DisplayProductInformation from './DisplayProductInformation';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'main', element: <MainPage /> },
        { path: 'shop', element: <ShopPage /> },
        { path: 'cart', element: <ShoppingCart /> },
      ],
    },
    { path: 'products/:productId', element: <DisplayProductInformation /> },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
