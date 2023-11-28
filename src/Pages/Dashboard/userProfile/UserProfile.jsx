import useAuth from "../../../Hooks/useAuth";
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_imageBB_api
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`

const UserProfile = () => {
    const { user, updateUser } = useAuth()
    const axiosPublic = useAxiosPublic();

    const { handleSubmit, formState: { errors }, register, reset } = useForm();

    const onSubmit = async (data) => {

        const img_file = { image: data.photo[0] }

        const res = await axiosPublic.post(image_hosting_api, img_file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const name = data.name;
            const photo = res.data.data.display_url;
            updateUser(name, photo)
                .then(() => {
                    location.reload();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please try again later!",
            });
            reset();
        }


    }


    return (
        <div className="p-3 md:p-10 mt-10">
            <h1 className="text-2xl md:text-3xl font-bold my-5 text-center md:text-start">Hi {user.displayName}, Welcome Back!</h1>
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
                <div className="avatar">
                    <div className="w-40 md:w-56 rounded-full ring  ring-offset-base-100 z-[-5] ring-offset-2">
                        <img src={user.photoURL} />
                    </div>
                </div>
                <div className="flex justify-center md:items-start items-center flex-col">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">{user.displayName}</h2>
                    <p className="md:text-xl font-bold">{user.email}</p>


                    {/* MODAL */}


                    <button className="btn bg-[#F5793B] text-white w-full mt-3 md:mt-10" onClick={() => document.getElementById('my_modal_2').showModal()}>Update Profile</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h2 className="text-center text-2xl font-bold">Update Profile</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input required defaultValue={user.displayName} className="input input-bordered" {...register("name", { required: true })} />
                                    {errors.name?.type === "required" && (<p className='text-red-600 font-bold text-center' role="alert">Name is required !!!</p>)}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input required type="file" className="file-input file-input-bordered w-full" {...register("photo")} />
                                </div>
                                <input className="btn bg-[#F5793B] text-white w-full mt-5" type="submit" value="Update" />
                            </form>
                        </div>   
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;