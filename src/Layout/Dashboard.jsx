import { Outlet } from "react-router-dom";
import Drawer from '../Components/Drawer'


const Dashboard = () => {

    return (
        <div className="flex">
            <Drawer></Drawer>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;