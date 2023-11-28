import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const {isPending, data: users = [], refetch} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    console.log(users)
    return (
        <div>
             
        </div>
    );
};

export default AllUsers;