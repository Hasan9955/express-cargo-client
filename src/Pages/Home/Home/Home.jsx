import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Feature from "../Feature";
import Statics from "./Statics";


const Home = () => {
    return (
        <div> 
            <Helmet>
            <title>Express Cargo | Home</title>
           </Helmet>
            <Banner></Banner>
            <Feature></Feature>
            <Statics></Statics>
        </div>
    );
};

export default Home;