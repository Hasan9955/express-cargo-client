
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdErrorOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query"; 
import PendingStatus from "../../../Components/PendingStatus";
import Swal from "sweetalert2";



const AllDeliverer = () => {


    const axiosSecure = useAxiosSecure();
    const { isPending, data: deliverers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/isDeliverer')
            return res.data
        }
    }) 

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }

    const handleRemove = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/deliverer/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Remove successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    

    return (
        <div>
        <h2 className="text-2xl md:text-4xl  font-extrabold text-center mt-10 mb-5">Total Deliverers: {deliverers?.length} </h2>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr className="uppercase">
                        <th className="hidden md:flex">#</th>
                        <th>deliverer Details</th>
                        <th>Total delivered</th>
                        <th>Average review</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deliverers?.map((deliverer, ind) => <tr key={deliverer._id}>
                            <th className="hidden md:flex">{ind + 1}</th>
                            <td>
                                <p>Name: {deliverer.name}</p>
                                <p>Email: {deliverer.email}</p> 
                            </td>
                            <td>
                               <p>Total Delivered: </p>
                            </td>

                            <td>
                                <p>Review:</p>
                            </td>

                            
                            <td>
                                <button  onClick={() => handleRemove(deliverer._id)} className="btn btn-error text-white ">
                                    <MdErrorOutline className="text-lg">
                                    </MdErrorOutline > Remove
                                </button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllDeliverer;