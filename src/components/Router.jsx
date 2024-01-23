import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainPage from './MainPage';
import ShopPage from './ShopPage';
import ShoppingCart from './ShoppingCart';
import DisplayProductInformation from './DisplayProductInformation';
import ErrorPage from './ErrorPage';
function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'main', element: <MainPage /> },
        {
          path: 'shop',
          element: <ShopPage />,
          children: [
            {
              path: 'products/:productId',
              element: <DisplayProductInformation />,
            },
          ],
        },
        { path: 'cart', element: <ShoppingCart /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
