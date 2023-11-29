import { useLoaderData, useNavigate } from 'react-router-dom'
import { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth"; 
import moment from "moment"; 
import Swal from "sweetalert2";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UpdateParcel = () => {

    const { user } = useAuth();
    const weightRef = useRef();
    const date = moment().format('YYYY-D-MM'); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const data = useLoaderData();
    const { _id, senderPhone, parcelType, weight, price: prevPrice, receiverName, receiverPhone, deliveryAddress, reqDeliveryDate, latitude, longitude } = data;
    
    
    const [upPrice, setPrice] = useState(prevPrice);
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const senderName = form.name.value;
        const email = form.email.value;
        const senderPhone = form.yourNum.value;
        const parcelType = form.type.value;
        const weight = form.weight.value;
        const receiverName = form.receiverName.value;
        const receiverPhone = form.receiverPhone.value;
        const deliveryAddress = form.address.value;
        const reqDeliveryDate = form.deliveryDate.value;
        const bookingDate = date;
        const latitude = form.latitude.value;
        const longitude = form.longitude.value;
        const price = upPrice;
        const status = 'pending'
        const bookingInfo = {
            senderName, email, senderPhone, parcelType, weight, price, receiverName, receiverPhone, deliveryAddress, reqDeliveryDate, bookingDate, latitude, longitude, status
        }
        
        axiosSecure.put(`/bookings/${_id}`, bookingInfo)
        .then(res =>{
            console.log(res.data)
            if(res.data.matchedCount){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your parcel Updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/myParcels')
            }
        })

    }



    const handlePrice = () => {
        const weight_total = weightRef.current.value
        const weight = parseFloat(weight_total)
        if (weight > 2) {
            setPrice(150)
        }
        else if (weight === 1) {
            setPrice(50)
        }
        else if (weight === 2) {
            setPrice(100)
        } 
        else {
            setPrice(0)
        }
    }
    return (
        <div>
        <div className="flex justify-center mt-5">

            <form onSubmit={handleForm} className="bg-pink-300 w-full lg:w-3/4 md:mx-4 mx-2 p-5 my-10 rounded-lg">
                <h2 className="text-3xl font-bold text-black text-center">Update Parcel</h2>
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Your Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} readOnly className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Your Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" readOnly required />
                    </div>
                    <div data-aos="fade-right" className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Your Phone Number</span>
                        </label>
                        <input defaultValue={senderPhone} type="number" name="yourNum" placeholder="Enter your phone number" className="input input-bordered" required /> 
                    </div>
                    <div data-aos="fade-left" className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Parcel Type</span>
                        </label>
                        <input defaultValue={parcelType} type="text" name="type" placeholder="Enter parcel type" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Parcel Weight (kg)</span>
                        </label>
                        <input defaultValue={weight} onChange={handlePrice} max="30" min="1" ref={weightRef} type="number" name="weight" placeholder="Enter parcel weight" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Price</span>
                        </label>
                        <input type="number" name="price" placeholder={upPrice} readOnly className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Receivers Name</span>
                        </label>
                        <input defaultValue={receiverName} type="text" name="receiverName" placeholder="Enter receiver's name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Receivers Phone Number</span>
                        </label>
                        <input defaultValue={receiverPhone} type="number" name="receiverPhone" placeholder="Enter receiver's phone number" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Delivery Address</span>
                        </label>
                        <input defaultValue={deliveryAddress} type="text" name="address" placeholder="Enter delivery address" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Requested Delivery Date</span>
                        </label>
                        <input defaultValue={reqDeliveryDate} type="date" name="deliveryDate" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Delivery Address Latitude</span>
                        </label>
                        <input defaultValue={latitude} type="text" name="latitude" placeholder="Enter delivery latitude" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Delivery Address longitude</span>
                        </label>
                        <input defaultValue={longitude} type="text" name="longitude" placeholder="Enter delivery longitude" className="input input-bordered" required />
                    </div>

                </div>
                <input className="btn btn-primary w-full mt-4" type="submit" value="Update" />
            </form>
        </div>
    </div>
    );
};

export default UpdateParcel;