import axios from "axios";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})


const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    // interceptors for request
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error);
    })


    // interceptors for response
    axiosSecure.interceptors.response.use((res) => {
        return res;
    }, (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            logOut()
            .then(() =>{
                return navigate('/signIn', {state: location.pathname})
            })
        }
        return Promise.reject(error)
    })

 
    return axiosSecure;
};

export default useAxiosSecure;