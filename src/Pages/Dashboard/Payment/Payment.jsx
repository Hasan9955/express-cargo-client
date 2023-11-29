import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckOut from "./CheckOut";



const Payment = () => {


    const loadedData = useLoaderData();
    const {_id, price, paymentStatus} = loadedData;
    console.log(price, _id)

    
    
    const stripPromise = loadStripe(import.meta.env.VITE_STRIPE_HOSTING_KIY) 

    
    return (
        <div>
            <Elements stripe={stripPromise}>
                <CheckOut price={price} id={_id} status={paymentStatus}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;