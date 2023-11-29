import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PendingStatus from "../../../Components/PendingStatus";




const DeliveryList = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { isPending, data = [] } = useQuery({
        queryKey: ['deliveryList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryList/${user.email}`)
            return res.data
        }
    })

    if(isPending){
        return <PendingStatus></PendingStatus>
    }

    console.log(data)
    return (
        <div>
            this length {data.length}
        </div>
    );
};

export default DeliveryList;