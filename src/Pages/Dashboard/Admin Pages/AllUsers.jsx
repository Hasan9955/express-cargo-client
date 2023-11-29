import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdErrorOutline, MdDeliveryDining, MdAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2"; 
import CountBookings from "./CountBookings";
import PendingStatus from "../../../Components/PendingStatus";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();


    const { isPending, data: users = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }

    const handleDelete = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Deleted successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    const makeDeliverer = (id) => {
        const upInfo = { role: 'deliverer' }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this man deliverer?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Deliverer!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, upInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Make deliverer successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    const makeAdmin = (id) => {
        const upInfo = { role: 'admin' }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make him admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, upInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Make Admin successfully!",
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
            <h2 className="text-2xl md:text-4xl  font-extrabold text-center mt-10 mb-5">Total Users: {users?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="uppercase">
                            <th className="hidden md:flex">#</th>
                            <th>User Details</th>
                            <th>Make deliverer</th>
                            <th>Make admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, ind) => <tr key={user._id}>
                                <th className="hidden md:flex">{ind + 1}</th>
                                <td>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <CountBookings email={user.email}></CountBookings>
                                </td>
                                <td>
                                    {
                                        user.role === 'deliverer' ? <p className="uppercase btn btn-xs no-animation text-[#F5793B] font-bold text-md">{user.role}</p> : <div>
                                            <button onClick={() => makeDeliverer(user._id)} className="btn bg-[#F5793B] text-white ">
                                                <MdDeliveryDining className="text-3xl">
                                                </MdDeliveryDining >
                                            </button><br />
                                        </div>
                                    }
                                </td>

                                <td>
                                    {
                                        user.role === 'admin' ? <p className="uppercase btn btn-xs no-animation text-green-600 font-bold text-md">{user.role}</p> : <div>
                                            <button onClick={() => makeAdmin(user._id)} className="btn btn-success text-white ">
                                                <MdAdminPanelSettings className="text-3xl">
                                                </MdAdminPanelSettings >
                                            </button><br />
                                        </div>
                                    }
                                </td>


                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-error text-white ">
                                        <MdErrorOutline className="text-lg">
                                        </MdErrorOutline > Delete
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

export default AllUsers;