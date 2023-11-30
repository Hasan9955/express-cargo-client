import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PendingStatus from "../../../Components/PendingStatus";
import { FcManager } from "react-icons/fc";
import { Link } from "react-router-dom";



const AllParcels = () => {


    const axiosSecure = useAxiosSecure();
    const { isPending, data: parcels = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allBookings')
            return res.data
        }
    })

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }








    return (
        <div>
            <h2 className="text-2xl md:text-4xl  font-extrabold text-center mt-10 mb-5">Total Parcels: {parcels?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="uppercase">
                            <th className="hidden md:flex">#</th>
                            <th>parcel Details</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((parcel, ind) => <tr key={parcel._id}>
                                <th className="hidden md:flex">{ind + 1}</th>
                                <td>
                                    <p>Sender Name: {parcel.senderName}</p>
                                    <p>Sender Phone: {parcel.senderPhone}</p>
                                    <p>Cost: ${parcel.price}</p>
                                </td>
                                <td>
                                    <p>Booking Date: {parcel.bookingDate}</p>
                                    <p>Requested Delivery Date: {parcel.reqDeliveryDate}</p>
                                </td>
                                <td>
                                    {parcel.status === 'canceled' ? <p className="uppercase btn btn-xs no-animation text-red-600 font-bold text-md w-24">{parcel.status}</p> : <p className="uppercase btn btn-xs no-animation text-blue-600 font-bold text-md w-24">{parcel.status}</p>}<br />
                                    <p className="uppercase btn btn-xs no-animation text-green-600 font-bold text-md mt-2 w-24">{parcel.paymentStatus ? parcel.paymentStatus : 'unpaid'}</p>
                                </td>
                                <td>
                                    <button disabled={parcel.status === 'on the way' || parcel.status === 'delivered'} className="btn btn-info text-white ">
                                        <Link className="flex justify-center items-center gap-2" to={`/dashboard/selectDeliverer/${parcel._id}`}>
                                            <FcManager className="text-lg">
                                            </FcManager > Manage
                                        </Link>
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

export default AllParcels;