import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Feature from "../Feature";
import Statics from "./Statics";
import TopDeliverer from "./TopDeliverer";
import About from "./About";


const Home = () => {
    return (
        <div> 
            <Helmet>
            <title>Express Cargo | Home</title>
           </Helmet>
            <Banner></Banner>
            <Feature></Feature>
            <Statics></Statics>
            <TopDeliverer></TopDeliverer>
            <About></About>
        </div>
    );
};

export default Home;