import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const AllDeliverer = () => {

    const axiosSecure = useAxiosSecure();
    axiosSecure.get('/users/isDeliverer')
        .then(res => {
            console.log(res.data)
        })
        
    return (
        <div>

        </div>
    );
};

export default AllDeliverer;