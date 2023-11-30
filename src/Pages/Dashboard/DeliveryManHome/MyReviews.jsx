import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PendingStatus from "../../../Components/PendingStatus"; 
import { Rating } from "@material-tailwind/react";

const MyReviews = () => {


    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { isPending, data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure(`/reviews/${user.email}`)
            console.log(res.data)
            return res.data
        }
    })

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }


    return (
        <div className="grid gap-5 my-20 md:grid-cols-3">
            {
                reviews.map(review => <div key={review._id}>
                    <div className="card bg-base-100 shadow-xl">
                    
                        <figure className=" ">
                            <img className=" rounded-xl" src={review.reviewerPhoto} alt="reviewer" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{review.reviewerName}</h2>
                            <p>Review Giving Date: {review.reviewDate ? review.reviewDate : '2023-11-30'}</p>
                            <Rating className="flex items-center justify-center" value={review.rating} readonly />
                            <p>{review.review}</p>
                            <div>
                                </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyReviews;