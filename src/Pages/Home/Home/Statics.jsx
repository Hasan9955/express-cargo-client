import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import PendingStatus from '../../../Components/PendingStatus';


const Statics = () => {


    const axiosPublic = useAxiosPublic()
    const { isPending, data } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/count')
            return res.data;
        }
    })

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }


    return (
        <div className="flex justify-center items-center my-20 ">
            <div className="  stats stats-vertical md:stats-horizontal shadow">
                <div className="stat place-items-center">
                    <div className="stat-value">
                        <CountUp
                            start={-300}
                            end={data?.bookingCount}
                            duration={10}
                        /></div>
                    <div className="font-bold text-xl">Total Booked Parcel</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-value text-secondary">
                        <CountUp
                            start={-300}
                            end={data?.deliveredCount}
                            duration={10}
                        /></div>
                    <div className="font-bold text-xl">Total Delivered</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-value">
                        <CountUp
                            start={-300}
                            end={data?.userCount}
                            duration={10}
                        /></div>
                    <div className="font-bold text-xl">Total User</div>
                </div>
            </div>
        </div>
    );
};

export default Statics;