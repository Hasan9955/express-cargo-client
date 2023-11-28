import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const CountBookings = ({email}) => {

    
    const [total, setTotal] = useState();
    const axiosSecure = useAxiosSecure();



    axiosSecure.get(`/totalBookings?email=${email}`)
    .then(res => {
        setTotal(res.data)
    }) 


    return (
        <p>
            Total Bookings:  {total?.length}
        </p>
    );
};

export default CountBookings;