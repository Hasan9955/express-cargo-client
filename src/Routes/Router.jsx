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
import AdminRoute from "./AdminRoute";
import SelectDeliverer from "../Pages/Dashboard/Admin Pages/SelectDeliverer";
import DeliveryList from "../Pages/Dashboard/DeliveryManHome/DeliveryList";
import MyReviews from "../Pages/Dashboard/DeliveryManHome/MyReviews";
import Payment from "../Pages/Dashboard/Payment/Payment";
import SuccessPage from "../Pages/Dashboard/Payment/SuccessPage";

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
          loader: ({params}) => fetch(`https://express-cargo-server.vercel.app/updateParcel/${params.id}`)
        },
        {
          path: 'payment/:id',
          element: <Payment></Payment>,
          loader: ({params}) => fetch(`https://express-cargo-server.vercel.app/updateParcel/${params.id}`)
        },
        {
          path: 'success/:id',
          element: <SuccessPage></SuccessPage>,
          loader: ({params}) => fetch(`https://express-cargo-server.vercel.app/updateParcel/${params.id}`)
        },


        // only admin routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'allUsers',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
          loader: () => fetch('https://express-cargo-server.vercel.app/countUsers')
        },
        {
          path: 'allDeliverers',
          element: <AdminRoute><AllDeliverer></AllDeliverer></AdminRoute>
        },
        {
          path: 'allParcels',
          element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
        },
        {
          path: 'selectDeliverer/:id',
          element: <AdminRoute><SelectDeliverer></SelectDeliverer></AdminRoute>,
          loader: ({params}) => fetch(`https://express-cargo-server.vercel.app/updateParcel/${params.id}`)
        },



        // only fo delivery man
        {
          path: 'deliveryList',
          element: <DeliveryList></DeliveryList>
        },
        {
          path: 'reviewList',
          element: <MyReviews></MyReviews>
        }
      ]
    }
  ]);

export default router;