import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import Navbar from "../../Pages/Navbar/Navbar";
import Footer from "../../Pages/Footer/Footer";


const Main = () => {

    const location = useLocation();

    useEffect(() =>{
        window.scrollTo(0, 0)
    },[location.pathname])

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;