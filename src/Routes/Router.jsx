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
import BookParcel from "../Pages/Dashboard/BookParcel/BookParcel";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import UpdateParcel from "../Pages/Dashboard/UpdateParcel/UpdateParcel";
import AdminHome from "../Pages/Dashboard/Admin Pages/AdminHome";
import AllUsers from "../Pages/Dashboard/Admin Pages/AllUsers";
import AllDeliverer from "../Pages/Dashboard/Admin Pages/AllDeliverer";
import AllParcels from "../Pages/Dashboard/Admin Pages/AllParcels";

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
          path: "bookParcel",
          element: <BookParcel></BookParcel>
        },
        {
          path: 'myParcels',
          element: <MyParcels></MyParcels>
        }, 
        {
          path: 'updateParcel/:id',
          element: <UpdateParcel></UpdateParcel>,
          loader: ({params}) => fetch(`http://localhost:5000/updateParcel/${params.id}`)
        },


        // only admin routes
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>
        },
        {
          path: 'allUsers',
          element: <AllUsers></AllUsers>
        },
        {
          path: 'allDeliverers',
          element: <AllDeliverer></AllDeliverer>
        },
        {
          path: 'allParcels',
          element: <AllParcels></AllParcels>
        }
      ]
    }
  ]);

export default router;