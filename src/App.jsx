// Import necessary components and functions from react-router-dom
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import UI components
import Home from './ui/Home';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';

// Import features
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

// Create browser router configuration
const router = createBrowserRouter([
  {
    element: <AppLayout />, // App layout component
    errorElement: <Error />, // Error component

    children: [
      {
        path: '/',
        element: <Home />, // Home component
      },
      {
        path: '/menu',
        element: <Menu />, // Menu component
        loader: menuLoader, // Loader function for menu
        errorElement: <Error />, // Error component for menu
      },
      { path: '/cart', element: <Cart /> }, // Cart component
      {
        path: '/order/new',
        element: <CreateOrder />, // CreateOrder component
        action: createOrderAction, // Action function for creating order
      },
      {
        path: '/order/:orderId',
        element: <Order />, // Order component
        loader: orderLoader, // Loader function for order
        errorElement: <Error />, // Error component for order
        action: updateOrderAction, // Action function for updating order
      },
    ],
  },
]);

// Main App component
function App() {
  return <RouterProvider router={router} />; // RouterProvider with configured router
}

export default App;
