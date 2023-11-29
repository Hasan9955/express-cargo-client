import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {Link} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { MdOutlineSystemUpdateAlt, MdErrorOutline, MdOutlinePayment } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import '../../../Components/Pending.css'


const MyParcels = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { isPending, data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`)
            return res.data;
        }
    })

    if (isPending) {
        return <div className="flex justify-center items-center mt-10">
            <div>
                <div className="animated-background">
                    <div className="background-masker btn-divide-left"></div>
                </div>
                <div className="grid mt-10 gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
                    <div className="css-dom"></div>
                    <div className="css-dom"></div>
                    <div className="css-dom"></div>
                    <div className="css-dom"></div>
                    <div className="css-dom hidden xl:flex lg:flex"></div>
                    <div className="css-dom hidden xl:flex lg:flex"></div>
                    <div className="css-dom hidden xl:flex"></div>
                    <div className="css-dom hidden xl:flex"></div>
                </div>
            </div>
        </div>
    }

    

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.acknowledged) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Canceled successfully",
                                showConfirmButton: false,
                                timer: 1500
                            }); 
                            refetch();
                        }
                    })
            }
        });
    } 


    const handlePayment = () => {

    }
    

    return (
        <>
        {
            bookings.length > 0 ? 
            <div>
                <h2 className="text-2xl md:text-4xl  font-extrabold text-center mt-10 mb-5">You have total {bookings?.length} parcels!</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="uppercase">
                                <th className="hidden md:flex">#</th>
                                <th>Parcel Details</th>
                                <th>Booking Status</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings?.map((booking, ind) => <tr key={booking._id}>
                                    <th className="hidden md:flex">{ind + 1}</th>
                                    <td>
                                        <p>Parcel Type: {booking.parcelType}</p>
                                        <p>Price: ${booking.price}</p>
                                        <p>Booking Date: {booking.bookingDate}</p> 
                                        <p>Req Delivery Date: {booking.reqDeliveryDate}</p>
                                    </td>
                                    <td>
    
                                        <p className="uppercase btn btn-xs no-animation text-green-600 font-bold text-md">{booking.status}</p>
                                        {booking.delivererId && <p>Deliverer ID: {booking?.delivererId}</p>}
                                    </td>
    
                                    <td>
                                        {
                                            booking.status === 'delivered' && <div>
                                                <button onClick={() => handlePayment(booking._id)} className="btn btn-xs btn-secondary text-white w-24">
                                                    <FaStar className=" ">
                                                    </FaStar> Review
                                                </button><br />
                                            </div>
                                        }
                                        {
                                            booking.paymentStatus === 'paid' ?  <p className="uppercase btn btn-xs w-24 no-animation text-blue-600 font-bold text-md">{booking.paymentStatus}</p>
                                            : <button className="btn btn-xs btn-primary text-white mt-1 w-24">
                                            <Link className="flex justify-center items-center gap-2" to={`/dashboard/payment/${booking._id}`}><MdOutlinePayment className="text-lg">
                                            </MdOutlinePayment > Pay</Link>
                                        </button>
                                        }
                                    </td>
                                    <td>
                                        <button disabled={booking.status !== 'pending'} className="btn btn-xs btn-secondary text-white w-24">
                                        <Link className="flex gap-2 justify-center items-center" to={`/dashboard/updateParcel/${booking._id}`}>
                                        <MdOutlineSystemUpdateAlt className="text-lg">
                                            </MdOutlineSystemUpdateAlt> Update
                                        </Link>
                                        </button><br />
                                        <button disabled={booking.status !== 'pending'} onClick={() => handleCancel(booking._id)} className="btn btn-xs btn-error text-white mt-1 w-24">
                                            <MdErrorOutline className="text-lg">
                                            </MdErrorOutline > Cancel
                                        </button>
                                    </td>
                                </tr>)
                            }
    
                        </tbody>
                    </table>
                </div>
            </div> : 
            <div className="flex flex-col text-center justify-center  items-center mb-20 p-2">
                    <img className=" " src="https://i.ibb.co/C9yrjVY/5899516.png" alt="" />
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#F5793B] font-semibold">No Packages Booked Yet. </h2>
                    <p className=" text-sm md:text-lg font-bold my-2">Lets Get Your Parcel Adventure Started! </p> 
                    <Link to='/dashboard/bookParcel'>
                        <button className="btn rounded-full btn-primary">Book a Parcel</button>
                    </Link>
                </div>
        }
        
        </>
    );
};

export default MyParcels;