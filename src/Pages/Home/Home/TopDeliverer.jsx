import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const TopDeliverer = () => {

    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ['topDeliverer'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topDeliverer')
            return res.data;
        }
    })

 
    
    return (
        <div>
            
        </div>
    );
};

export default TopDeliverer;