import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdErrorOutline, MdDeliveryDining, MdAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2";
import CountBookings from "./CountBookings";
import PendingStatus from "../../../Components/PendingStatus";
import { useState, useEffect } from 'react'
import { useLoaderData } from "react-router-dom";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [userPerPage, setUserPerPage] = useState(5);

    const { count } = useLoaderData();
    console.log(count)
    const numberOfPage = Math.ceil(count / userPerPage)
    const pages = [...Array(numberOfPage).keys()]

    useEffect(() => {
        axiosSecure.get(`/users?page=${currentPage}&size=${userPerPage}`)
            .then(res => {
                setUsers(res.data)
            })
    }, [axiosSecure, currentPage, userPerPage])


    const { isPending, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&size=${userPerPage}`)
            setUsers(res.data)
            return res.data
        }
    })

    if (isPending) {
        return <PendingStatus></PendingStatus>
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Deleted successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    const makeDeliverer = (id) => {
        const upInfo = { role: 'deliverer' }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this man deliverer?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Deliverer!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, upInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Make deliverer successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    const makeAdmin = (id) => {
        const upInfo = { role: 'admin' }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make him admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`, upInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Make Admin successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    const handleItemPerPage = e => {
        const value = parseInt(e.target.value)

        setUserPerPage(value)
        setCurrentPage(0)
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }


    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }



    return (
        <div>
            <div className="flex flex-col justify-center items-center my-10">
            <h2 className="text-2xl md:text-4xl  font-extrabold text-center mb-5">Total Users: {count} </h2>
            <div className="join">
                <select name="filter" className="select select-bordered join-item w-64" defaultValue={5} onChange={handleItemPerPage} required>
                <option value="5">5</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value={count}>All</option>
                </select>
                <button className="btn btn-primary join-item">Show</button>
            </div> 
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="uppercase">
                            <th className="hidden md:flex">#</th>
                            <th>User Details</th>
                            <th>Make deliverer</th>
                            <th>Make admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, ind) => <tr key={user._id}>
                                <th className="hidden md:flex">{ind + 1}</th>
                                <td>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <CountBookings email={user.email}></CountBookings>
                                </td>
                                <td>
                                    {
                                        user.role === 'deliverer' ? <p className="uppercase btn btn-xs no-animation text-[#F5793B] font-bold text-md">{user.role}</p> : <div>
                                            <button onClick={() => makeDeliverer(user._id)} className="btn bg-[#F5793B] text-white ">
                                                <MdDeliveryDining className="text-3xl">
                                                </MdDeliveryDining >
                                            </button><br />
                                        </div>
                                    }
                                </td>

                                <td>
                                    {
                                        user.role === 'admin' ? <p className="uppercase btn btn-xs no-animation text-green-600 font-bold text-md">{user.role}</p> : <div>
                                            <button onClick={() => makeAdmin(user._id)} className="btn btn-success text-white ">
                                                <MdAdminPanelSettings className="text-3xl">
                                                </MdAdminPanelSettings >
                                            </button><br />
                                        </div>
                                    }
                                </td>


                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-error text-white ">
                                        <MdErrorOutline className="text-lg">
                                        </MdErrorOutline > Delete
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex flex-col justify-center items-center mt-10 mb-10'>
                <p className="mb-2 font-bold ">Current page: {currentPage + 1}</p>
                <div>
                    <button className={currentPage > 0 ? "btn btn-primary " : "btn-disabled btn cursor-not-allowed"} onClick={handlePrev}>Prev</button>
                    {
                        pages.map(page => <button key={page} className={`btn ml-2 btn-outline ${currentPage === page ? 'bg-black text-white' : ''}`} onClick={() => setCurrentPage(page)}>{page + 1}</button>)
                    }

                    <button className={currentPage < pages.length - 1 ? "btn btn-primary ml-2" : "btn-disabled btn cursor-not-allowed ml-2"} onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;