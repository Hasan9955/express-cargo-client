import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';



const PrivateRoutes = ({children}) => {

    const location = useLocation();
    const {user, loading} = useAuth();
    if(loading){
        return <div className="w-8 mx-auto md:my-64 my-56 lg:my-72"><span className="loading loading-infinity loading-lg"></span></div>
    }

    if(user){
        return children;
    }
    
    return <Navigate state={location.pathname} replace to='/signIn'></Navigate>
};

PrivateRoutes.propTypes = {
    children: PropTypes.object
}

export default PrivateRoutes;