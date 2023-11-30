import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth';
// import Swal from 'sweetalert2';
import { LuLogOut } from "react-icons/lu"; 
import useAdmin from '../../Hooks/useAdmin';
import { toast } from 'react-toastify';



const Navbar = () => {


    const { user, logOut } = useAuth(); 
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Swal.fire({
                //     position: "top-end",
                //     icon: "error",
                //     title: "Now you have logOut!",
                //     showConfirmButton: false,
                //     timer: 2000
                // });
            })
    }
    const navLinks = <>

        <li><NavLink to="/"
            style={({ isActive }) => ({
                color: isActive && '#fff',
                background: isActive && '#F5793B',
            })}
        >HOME</NavLink></li> 

        {
            user && isAdmin && <li><NavLink to="/dashboard/adminHome" style={({ isActive }) => ({ color: isActive && '#fff', background: isActive && '#F5793B', })} >DASHBOARD</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to="/dashboard/userProfile" style={({ isActive }) => ({ color: isActive && '#fff', background: isActive && '#F5793B', })} >DASHBOARD</NavLink></li>
        }


    </>
    return (
        <div className="fixed z-[10] navbar bg-base-100 shadow-lg rounded-b-lg md:px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">

                        {navLinks}
                    </ul>
                </div>
                <Link to="/">
                    <img className='w-56' src="https://i.ibb.co/my8y07y/Screenshot-2023-11-25-141635.png" alt="" />
                </Link>
            </div>


            <div className='navbar-end '>
                <div className="hidden lg:flex mr-12">
                    <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-3">
                        {navLinks}
                    </ul>
                </div>


                <div className=' flex justify-center items-center '>
                    <button onClick={() => toast.error('Sorry this feature is not available!')} className="mr-7 btn lg:btn-md btn-sm btn-circle relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <div className="badge p-1 bg-[#F5793B] text-white absolute -top-1 -right-4 text-[12px] w-6"> </div>
                        </button>
                    
                    {
                        user ? <div className='flex items-center'>
                            <div className="dropdown dropdown-hover dropdown-end">
                                <label tabIndex={0} className="md:mx-2 btn btn-sm md:btn-md btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt='userImg' />

                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[10] menu px-5 mt-3 shadow bg-base-100 rounded-box py-5 w-56">
                                    <div className='flex flex-col justify-center items-center mb-4'>
                                        <label tabIndex={0} className="btn btn-circle avatar">
                                            <div className="w-16 rounded-full">
                                                <img src={user.photoURL} alt='userImg' />

                                            </div>
                                        </label>
                                        <h2 className='text-lg font-bold'>{user.displayName}</h2>
                                        <h2>{user.email}</h2>
                                        <Link to='/dashboard/userProfile'>
                                            <button className="btn lg:btn-sm btn-xs bg-[#F5793B] hover:bg-[#F5793B] hover:border-[#F5793B] text-white mt-2">View Profile</button>
                                        </Link>
                                    </div>
                                    {
                                        user && isAdmin && <li><NavLink className="font-bold" to='/dashboard/adminHome'>Dashboard</NavLink></li>
                                    }
                                    {
                                        user && !isAdmin && <li><NavLink className="font-bold" to='/dashboard/userProfile'>Dashboard</NavLink></li>
                                    }

                                    <li><button className='font-bold text-md text-[#F5793B]' onClick={handleLogOut}>Logout <LuLogOut className='text-xl'></LuLogOut></button></li>
                                </ul>
                            </div>

                        </div> :
                            <Link to='/signIn'>
                                <button className="btn btn-outline lg:btn-sm btn-xs rounded-full text-[#F5793B] hover:bg-[#F5793B] hover:border-[#F5793B]">Sign In</button>
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;