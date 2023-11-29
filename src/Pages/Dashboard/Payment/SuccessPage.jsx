import { useLoaderData } from "react-router-dom";  
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use';


const SuccessPage = () => {

    const loadedData = useLoaderData();
    console.log(loadedData) 
    const {width, height} = useWindowSize();

    return (
        <>
            <Confetti
                width={width}
                height={height}
            />
            <div className="flex flex-col justify-center items-center">
                <img className="w-24 md:w-32" src="https://i.ibb.co/ZT2CFZB/Eo-circle-green-white-checkmark-svg.png" alt="" />
                <p className="text-3xl font-bold">Your payment successful!!!</p>
                <p className="text-xl font-bold">Your Transaction ID: {loadedData?.transactionId}</p>
            </div>
        </>


    );
};

export default SuccessPage;