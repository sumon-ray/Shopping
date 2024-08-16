import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Layer from "../MainLayer/Layer";
import About from "../Pages/About/About";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Form from "../Pages/Home/AddProduct/Form";
import Details from "../Pages/Home/HomeData/Details";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layer />,
      children:[
        {
            path:'/',
            element:<Home />
        },
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/registration',
          element:<Registration />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/form',
          element: <Form />
        },
        {
          path: '/details/:id',
          element: <Details />
        },
      ]
    },
  ]);
  