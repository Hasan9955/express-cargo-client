import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MdOutlineSystemUpdateAlt, MdErrorOutline, MdOutlinePayment } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment"; 
import PendingStatus from "../../../Components/PendingStatus";


const MyParcels = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const reviewDate = moment().format('YYYY-D-MM');

    const { isPending, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`)
            setBookings(res.data)
            return res.data;
        }
    })

    const handleFilter = (e) => {
        e.preventDefault();
        const status = e.target.filter.value;
        console.log(status)
        axiosSecure.get(`/bookings?email=${user.email}&status=${status}`)
            .then(res => {
                setBookings(res.data)
            })
    }

    if (isPending) {
        return <PendingStatus></PendingStatus>
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


    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const reviewerName = form.name.value;
        const reviewerPhoto = form.photo.value;
        const review = form.review.value;
        const rating = parseInt(form.rating.value || 5);
        const parcelId = form.parcelId.value;
        const delivererId = form.delivererId.value;
        const delivererEmail = form.delivererEmail.value; 
        const reviewDetails = { reviewerName, reviewerPhoto, review, rating, parcelId, delivererId, delivererEmail, reviewDate } 
        axiosSecure.post('/reviews', reviewDetails)
        .then(res => {
            if(res.data.insertedId){
                axiosSecure.put(`/update/${parcelId}`)
                .then(res =>{
                    if(res.data.modifiedCount){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Thank you for your review!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
            }
        })
    }


    return (
        <>
            {
                bookings.length ?
                    <div>
                        <form className="flex justify-center items-center flex-col mb-5" onSubmit={handleFilter}>
                            <h2 className="text-2xl md:text-4xl  font-extrabold mt-10 mb-5">You have total {bookings?.length} parcels!</h2>
                            <div className="join">
                                <select name="filter" className="select select-bordered join-item w-64" required>
                                    <option>pending</option>
                                    <option>processing</option>
                                    <option>on the way</option>
                                    <option>delivered</option>
                                    <option>canceled</option>
                                </select>
                                <button className="btn btn-primary join-item">Filter</button>
                            </div>
                            <p className="mt-2 text-lg font-bold uppercase">Filter by booking status!!!</p>
                        </form>
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
                                                    booking.status === 'delivered' && <div> {
                                                        booking.reviewStatus ? 
                                                        <p className="uppercase mt-1 btn btn-xs w-24 no-animation text-secondary font-bold text-md">{booking.reviewStatus}</p> :
                                                        <div>
                                                            <button className="btn btn-xs btn-secondary text-white w-24" onClick={() => document.getElementById('my_modal_2').showModal()}><FaStar> </FaStar> Review</button>
                                                        <dialog id="my_modal_2" className="modal">
                                                            <div className="modal-box">
                                                                <h2 className="text-xl text-center font-bold">Give us your review!!!</h2>
                                                                <form onSubmit={handleReview}>
                                                                    <div className="hidden">
                                                                        <input name="parcelId" type="text" defaultValue={booking._id} /> 
                                                                        <input name="delivererEmail" type="text" defaultValue={booking.delivererEmail} />
                                                                    </div>
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text">Deliverer ID</span>
                                                                        </label>
                                                                        <input name="delivererId" type="text" defaultValue={booking.delivererId} className="input input-bordered" readOnly required />
                                                                    </div>
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text">Your Name</span>
                                                                        </label>
                                                                        <input name="name" type="text" defaultValue={user.displayName} className="input input-bordered" readOnly required />
                                                                    </div>
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text">Your Photo</span>
                                                                        </label>
                                                                        <input name="photo" type="text" defaultValue={user.photoURL} className="input input-bordered" readOnly required />
                                                                    </div>
                                                                    <div className="form-control">
                                                                        <label className="label">
                                                                            <span className="label-text">Review</span>
                                                                        </label>
                                                                        <textarea name="review" placeholder="Enter your review massage" className="textarea textarea-bordered textarea-xs text-sm w-full" required></textarea>
                                                                    </div>
                                                                    <label className="label">
                                                                        <span className="label-text">Ratting</span>
                                                                    </label>
                                                                    <div className="rating input input-bordered flex justify-center items-center">
                                                                        <input type="radio" name="rating" value="1" className="mask mask-star-2 bg-orange-400" />
                                                                        <input type="radio" name="rating" value="2" className="mask mask-star-2 bg-orange-400" />
                                                                        <input type="radio" name="rating" value="3" className="mask mask-star-2 bg-orange-400" />
                                                                        <input type="radio" name="rating" value="4" className="mask mask-star-2 bg-orange-400" />
                                                                        <input type="radio" name="rating" value="5" className="mask mask-star-2 bg-orange-400" />
                                                                    </div>
                                                                    <input className="btn btn-secondary w-full mt-4" type="submit" value="Submit" />
                                                                </form>
                                                            </div>
                                                            <form method="dialog" className="modal-backdrop">
                                                                <button>close</button>
                                                            </form>
                                                        </dialog>
                                                        </div> }
                                                    </div>
                                                }
                                                {
                                                    booking.paymentStatus === 'paid' ? <p className="uppercase mt-1 btn btn-xs w-24 no-animation text-blue-600 font-bold text-md">{booking.paymentStatus}</p>
                                                        : <button className="btn btn-xs btn-primary text-white w-24">
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
                    <>
                        <form className="flex justify-center items-center flex-col mb-5" onSubmit={handleFilter}>
                            <h2 className="text-2xl md:text-4xl  font-extrabold mt-10 mb-5">You have total {bookings?.length} parcels!</h2>
                            <div className="join">
                                <select name="filter" className="select select-bordered join-item w-64" required>
                                    <option>pending</option>
                                    <option>processing</option>
                                    <option>on the way</option>
                                    <option>delivered</option>
                                    <option>canceled</option>
                                </select>
                                <button className="btn btn-primary join-item">Filter</button>
                            </div>
                            <p className="mt-2 text-lg font-bold uppercase">Filter by booking status!!!</p>
                        </form>
                        <div className="flex flex-col text-center justify-center  items-center mb-20 p-2">
                            <img className=" " src="https://i.ibb.co/C9yrjVY/5899516.png" alt="" />
                            <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#F5793B] font-semibold">No Package Found. </h2>
                            <p className=" text-sm md:text-lg font-bold my-2">Lets Get Your Parcel Adventure Started! </p>
                            <Link to='/dashboard/bookParcel'>
                                <button className="btn rounded-full btn-primary">Book a Parcel</button>
                            </Link>
                        </div>
                    </>
            }

        </>
    );
};

export default MyParcels;