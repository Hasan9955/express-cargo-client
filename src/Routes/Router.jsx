import {
    createBrowserRouter, 
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp"; 
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../Pages/Dashboard/userProfile/UserProfile";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import BookParcel from "../Pages/Dashboard/BookParcel/BookParcel";

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
      element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children: [
        {
          path: "userProfile",
          element: <UserProfile></UserProfile>
        },
        {
          path: "allUser",
          element: <AllUsers></AllUsers>
        },
        {
          path: "bookParcel",
          element: <BookParcel></BookParcel>
        }
      ]
    }
  ]);

export default router;