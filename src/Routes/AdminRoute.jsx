import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) {
        return <div className="w-8 mx-auto md:my-64 my-56 lg:my-72"><span className="loading loading-infinity loading-lg"></span></div>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/"></Navigate>;
};

export default AdminRoute;