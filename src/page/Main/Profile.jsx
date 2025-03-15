
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useRole from "@/Hooks/useRole";
import { imageUpload } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {user, profileUpdate, loading} = useAuth();
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files;
        let photoURL = user?.photoURL;

        if (image.length > 0) {
            const uploadResponse = await imageUpload(image);
            if (uploadResponse?.data?.display_url) {
                photoURL = uploadResponse.data.display_url;
            }
        }

        try {
            await profileUpdate(name, photoURL);
            await axiosSecure.patch(`/users/email/${user?.email}`, {name : name});
            toast.success('Profile Updated successfully')
            setIsModalOpen(false);
        } catch (error) {
            console.error("Profile update failed:", error);
        }
    }

    return (
        <section className="pb-24 pt-10 flex items-center justify-center">

            <div className="xl:max-w-[1200px] max-w-[90%] mx-auto border border-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500">
                
                <div className="border-2 rounded-full h-56 w-56 flex items-center justify-center border-dashed border-blue-500 mx-auto">
                    {
                    user ?.photoURL ?
                    <img 
                    className="rounded-full h-52 w-52 mx-auto" 
                    src={user?.photoURL} 
                    alt="User Avatar" />
                    :
                    <img className="rounded-full h-52 w-52" src=" https://i.ibb.co.com/p6fDkxKQ/Screenshot-2025-03-15-144204-removebg-preview-1.png " />
                    }
                </div>

                <div className="text-center">
                    <h1 className="text-2xl font-bold mt-3 text-center">{user?.displayName}</h1>
                    <h1 className="mt-2 text-lg font-semibold text-pink-500">{user?.email}</h1>
                    <button 
                    onClick={toggleModal}
                    className="py-2 px-6 rounded-lg bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold text-white mt-3"
                    >Update Profile
                    </button>

                    {role === "Admin" && <Link to={'/dashboard'}><p className="mt-3 text-sm text-blue-500">Go Dashboard</p></Link>}
                </div>

                {/* Modal */}
                {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50 backdrop-blur-md">
                    <div className="bg-[#8080804e] rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h3 className="text-3xl font-bold text-blue-500 mb-4 text-center">Update Profile</h3>
                    <form className="space-y-4" onSubmit={handleUpdate}>

                        {/* name input */}
                        <div>
                            <h1 className='font-semibold mb-2'>Name</h1>
                            <input 
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit'
                            type="text" 
                            placeholder='Enter Your Name'
                            name='name'
                            defaultValue={user?.displayName}
                            />
                        </div>

                        {/* Image input */}
                        <div className='mt-3'>
                            <h1 className='font-semibold mb-2'>Change Photo</h1>

                            <div className=' w-full  m-auto rounded-lg'>
                                <div className='file_upload px-5 py-3 relative border-2 border-dotted border-purple-500 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                    <input
                                        className='text-sm cursor-pointer w-full hidden'
                                        type='file'
                                        accept='image/*'
                                        hidden
                                        name="image"
                                    />
                                    <div className='bg-purple-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-700'>
                                    upload
                                    </div>
                                    </label>
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* email input */}
                        <div className='mt-3'>
                            <h1 className='font-semibold mb-2'>Email</h1>
                            <input 
                            disabled
                            className='border border-purple-500 outline-0 p-3 w-full rounded-lg focus:border-2 bg-inherit disabled:cursor-not-allowed opacity-75'
                            type="email" 
                            placeholder='Enter Your Email' 
                            name="email"
                            defaultValue={user?.email}
                            />
                        </div>


                        <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] text-white rounded-lg hover:bg-gray-900 disabled:cursor-not-allowed"
                        >
                            {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Save'}
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                )}
            </div>
        </section>
    );
};

export default Profile;
