import { Link, NavLink } from "react-router-dom";
import { FaHome, FaList, FaUsers, FaBox, FaParachuteBox } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useDeliverer from "../Hooks/useDeliverer";



const Drawer = () => {

    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isDeliverer] = useDeliverer(); 

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost  drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="w-56 pt-5 md:px-2 min-h-screen border-2 shadow-xl bg-white">
                        <Link to="/">
                            <img className='mb-8 w-48 mx-auto md:w-56' src="https://i.ibb.co/my8y07y/Screenshot-2023-11-25-141635.png" alt="" />
                        </Link>
                        <ul className="menu uppercase text-md">
                            {/* Admin routes */}
                            {
                                user && isAdmin && !isDeliverer && <div>

                                    <li>
                                        <NavLink to='/dashboard/adminHome'>
                                            <FaHome className="text-2xl"></FaHome> Admin Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/manageItems'>
                                            <FaList className="text-2xl"></FaList> All Parcels
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/manageBookings'>
                                            <MdDeliveryDining className="text-2xl"></MdDeliveryDining> All  Delivery Men
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/users'>
                                            <FaUsers className="text-2xl"></FaUsers> all users
                                        </NavLink>
                                    </li>
                                </div>
                            }

                            {/* Deliverer routes */}


                            {
                                user && isDeliverer && !isAdmin && <div>

                                    <li>
                                        <NavLink to='/dashboard/userProfile'>
                                            <FaHome className="text-2xl"></FaHome> Deliverer Home
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to='/dashboard/deliveryList'>
                                            <FaList className="text-2xl"></FaList> My Delivery List
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/reviewList'>
                                            <TbStarsFilled className="text-2xl"></TbStarsFilled> My Reviews
                                        </NavLink>
                                    </li>
                                </div>
                            }

                            {/* user routes */}


                            {
                                user && !isAdmin && !isDeliverer && <div>

                                    <li>
                                        <NavLink to='/dashboard/userProfile'>
                                            <FaHome className="text-2xl"></FaHome> My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/bookParcel'>
                                            <FaParachuteBox className="text-2xl"></FaParachuteBox >  Book a Parcel
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/deliveryList'>
                                            <FaBox className="text-2xl"></FaBox > My Parcels
                                        </NavLink>
                                    </li>
                                </div>
                            }

                            <div className="divider"></div>


                            {/* common links for all user */}
                            <NavLink to='/'>
                                <button className="btn bg-[#F5793B] text-white w-full">
                                    <FaHome className="text-2xl"></FaHome>Go Home
                                </button>
                            </NavLink>
                        </ul>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Drawer;