import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useDeliverer = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: isDeliverer, isPending: isDelivererLoading } = useQuery({
        queryKey: ['isDeliverer'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliverer/${user.email}`)
            return res.data.isDeliverer
        }
    })
    return [isDeliverer, isDelivererLoading]
}

export default useDeliverer;