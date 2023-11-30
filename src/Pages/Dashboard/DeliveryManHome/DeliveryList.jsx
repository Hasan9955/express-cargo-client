import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PendingStatus from "../../../Components/PendingStatus";
import { MdErrorOutline } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import Swal from "sweetalert2"; 



const DeliveryList = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { isPending, data: deliveryList = [], refetch } = useQuery({
        queryKey: ['deliveryList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryList/${user.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }



    const handeldelivery = (id, delStatus) =>{
        const delInfo = { status: delStatus }
        Swal.fire({
            title: "Are you sure?",
            text: `You want to make this parcel status ${delStatus}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/delivery/${id}`, delInfo)
                    .then(res => { 
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `successfully change state to ${delStatus}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    const handleMap = () =>{
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'Sorry...... this feature is not available right now!',
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <div>
            <h2 className="text-2xl md:text-4xl  font-extrabold text-center mt-10 mb-5">Total delivery: {deliveryList?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="uppercase">
                            <th className="hidden md:flex">#</th>
                            <th>parcel Details</th>
                            <th>Date</th>
                            <th>Map</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryList?.map((parcel, ind) => <tr key={parcel._id}>
                                <th className="hidden md:flex">{ind + 1}</th>
                                <td>
                                    <p>Sender Name: {parcel.senderName}</p>
                                    <p>Sender Phone: {parcel.senderPhone}</p>
                                    <p>Receiver Name: {parcel.receiverName}</p>
                                    <p>Receiver Phone: {parcel.receiverPhone}</p>
                                </td>
                                <td>
                                    <p>Requested Delivery Date: {parcel.reqDeliveryDate}</p>
                                    <p>Approximate Delivery Date: {parcel.approximate ? parcel.approximate : '2023-12-15'}</p>
                                    <p>Delivery Address: {parcel.deliveryAddress}</p>
                                </td>
                                <td>
                                    <button onClick={handleMap} className="btn btn-info text-white"> View map </button>
                                    {/* <p className="uppercase btn btn-xs no-animation text-green-600 font-bold text-md mt-2 w-24">{parcel.paymentStatus ? parcel.paymentStatus : 'unpaid'}</p> */}
                                </td>
                                <td>
                                    {
                                        parcel.status === 'delivered' ? <p className="uppercase btn btn-sm no-animation text-blue-600 font-bold text-md mt-2 w-28">Delivered</p> : <button disabled={parcel.status === 'delivered' || parcel.status === 'canceled'} onClick={() => handeldelivery(parcel._id, 'delivered')} className="btn btn-sm btn-primary text-white mt-1 w-28">
                                        <GrDeliver className="text-lg">
                                        </GrDeliver > Delivery
                                    </button>
                                    }
                                    <br />
                                    {
                                        parcel.status === 'canceled' ? <p className="uppercase btn btn-sm no-animation text-red-600 font-bold text-md mt-1 w-28">Canceled</p> : <button disabled={parcel.status === 'delivered'} onClick={() => handeldelivery(parcel._id, 'canceled')} className="btn btn-sm btn-error text-white mt-1 w-28">
                                        <MdErrorOutline className="text-lg">
                                        </MdErrorOutline > Cancel
                                    </button>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default DeliveryList;