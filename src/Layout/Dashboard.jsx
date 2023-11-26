import { Outlet } from "react-router-dom";
import Drawer from '../Components/Drawer'


const Dashboard = () => {

    return (
        <div className=" ">
            <Drawer></Drawer>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;