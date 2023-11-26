import {
    createBrowserRouter, 
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: 'signIn',
            element: <SignIn></SignIn>
        },
        {
            path: 'signUp',
            element: <SignUp></SignUp>
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
    }
  ]);

export default router;