import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import OrderItem from "./features/order/OrderItem";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <OrderItem />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
