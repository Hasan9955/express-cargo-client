import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SelectDeliverer = () => {

    const loaderData = useLoaderData();
    const {_id} = loaderData;
    const navigate = useNavigate();
    
    const axiosSecure = useAxiosSecure();
    const { data: deliverers = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/isDeliverer')
            return res.data
        }
    })


    const handleAppoint = async (delivererId, delivererEmail) =>{
        console.log(delivererId, delivererEmail, _id)
        const deliverer = {delivererId, delivererEmail}
        const res = await axiosSecure.put(`/appoint/${_id}`, deliverer)
        if(res.data.modifiedCount){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Deliverer appointed successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/allParcels')
        }
    }

    return (
        <div className="mt-10">
            <table className="table table-zebra w-full">
                <thead>
                    <tr className="uppercase">
                        <th>DelivererId</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deliverers?.map(deliverer => <tr key={deliverer._id}>

                            <td>
                                <p>{deliverer._id}</p>
                            </td>
                            <td>
                                <p>{deliverer.email}</p>
                            </td>
                            <td>
                                <button onClick={() => handleAppoint(deliverer._id, deliverer.email)} className="btn btn-primary text-white ">Appoint</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

        </div>
    );
};

export default SelectDeliverer;