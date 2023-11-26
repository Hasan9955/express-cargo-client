import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import Navbar from "../../Pages/Navbar/Navbar";
import Footer from "../../Pages/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {

    const location = useLocation();

    useEffect(() =>{
        window.scrollTo(0, 0)
    },[location.pathname])

    const handleNavFoot = location.pathname.includes('signUp') || location.pathname.includes('signIn')

    return (
        <div>
            {handleNavFoot || <Navbar></Navbar>}
            <Outlet></Outlet>
            {handleNavFoot || <Footer></Footer>}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Main;