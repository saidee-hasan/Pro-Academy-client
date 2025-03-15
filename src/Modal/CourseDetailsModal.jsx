import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAuth from '@/Hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useRole from '@/Hooks/useRole';

const CourseDetailsModal = ({setIsModalOpen, courseDetails}) => {

    const {courseName, discount, image, privateGroup} = courseDetails;
    const {user} = useAuth();
    const [loading, setLoading] = useState();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole();

    const {mutateAsync} = useMutation({
        mutationKey : ['course-request'],
        mutationFn : async courseData => {
            const {data} = await axiosSecure.post('/course-request', courseData);
            return data;
        }
    })

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const phoneNumber = form.phoneNumber.value;
        const transactionID = form.transactionID.value;
        
        const courseData = {
            courseName,
            image,
            phoneNumber,
            transactionID,
            student : {
                name : user?.displayName,
                email : user?.email
            },
            status : "Pending",
            privateGroup,
        }

        if(role === 'Admin'){
            setLoading(false);
            return toast.error('Permission Not Allowed. You are a admin.');
        }

        try {
            await mutateAsync(courseData);
            toast.success('Submitted Data Successfully! Please wait for admin approval.')
        } catch (error) {
            console.log(`error post course request : ${error}`);
            toast.error(`Submit failed. Please Try Again!`)
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    }


    useEffect(() => {
        AOS.init();
    }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
        <div data-aos="zoom-in-up"  data-aos-duration="1000" className="bg-[#8080804e] p-6 rounded-lg shadow-lg text-center max-w-[90%] xl:max-w-[1100px] h-[400px] lg:h-[530px] overflow-auto mx-auto">

            <h1 className='text-2xl text-green-500 font-semibold'>Check the following rules carefully for payment.</h1>

            <div className='flex flex-col lg:flex-row gap-16 my-5'>

                <div className='lg:w-[50%] text-start text-lg text-gray-300'>
                    <p>
                        To enroll in the course, you need to send money of <span className='text-blue-500 font-bold'>{discount}</span> taka from any development, cash account number to our number. (You can send only <span className='text-blue-500 font-bold'>{discount}</span> taka excluding Cash Out Charge)
                    </p>

                    <p className='mt-3'>
                        After sending money successfully, submit the Transaction ID and the phone number from which you sent the money by going to the next page. <span className='text-orange-600 font-semibold'>Of course send money</span>. The following numbers are personal numbers. Nothing will happen except send money.
                    </p>

                    <p className='mt-3'>
                        In case of payment problem contact us directly: <span className='font-mono text-yellow-500 font-bold'>01865467486</span>
                    </p>
                </div>


                <div className='lg:w-[50%] text-start'>
                    <p className='text-xl mb-3'>
                        <span className='text-pink-500 font-bold'>Bkash</span>, 
                        <span className='text-orange-500 font-bold'> Nagad</span>, 
                        <span className='text-purple-500 font-bold'> Rocket</span> and 
                        <span className='text-yellow-500 font-bold'> Upay </span> 
                        Personal Number
                    </p>

                    <p className='mb-1'>
                        <span className='font-bold'>Bkash</span>  : 
                        <span className='font-mono'>    01764984545</span>
                    </p>

                    <p className='mb-1'>
                        <span className='font-bold'> Nagad</span>   : 
                        <span className='font-mono'>     01764984545</span>
                    </p>

                    <p className='mb-1'>
                        <span className='font-bold'> Rocket</span>  : 
                        <span className='font-mono'>    01764984545</span>
                    </p>

                    <p>
                    <span className='font-bold'> Upay </span>   : 
                    <span className='font-mono'>     01764984545</span>
                    </p>

                    <div className='bg-[#8080801c] mt-5 p-3 rounded-lg'>

                        <h1 className='text-center text-green-500 text-xl font-bold mb-2'>Submit the form with correct information</h1>

                        <form onSubmit={handleSubmit}>
                            {/* phone number */}
                            <div>
                                <label 
                                className='text-blue-500 font-semibold' 
                                htmlFor="phoneNumber">
                                    Phone Number 
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                type='number'
                                className='w-full bg-inherit border-b-2  border-gray-400 focus:border-blue-500 focus:outline-0' 
                                name='phoneNumber'
                                required
                                />
                            </div>

                            {/* transaction id */}
                            <div className='mt-2'>
                                <label 
                                className='text-blue-500 font-semibold' 
                                htmlFor="transactionID">
                                    Transaction ID 
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                type='text'
                                className='w-full bg-inherit border-b-2  border-gray-400 focus:border-blue-500 focus:outline-0' 
                                name='transactionID'
                                required
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-3">
                                <button
                                disabled={loading}
                                type='submit'
                                className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-2 px-5 rounded-lg font-bold transition-[0.5s] disabled:cursor-not-allowed"
                                >
                                    {
                                        loading ? 
                                        <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> 
                                        : 
                                        "Submit"
                                    }
                                </button>
                                
                                <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => setIsModalOpen(false)}
                                >
                                Cancel
                                </button>
                            </div>

                        </form>

                    </div>
                    
                </div>

            </div>

           
            

        </div>
    </div>
  )
}

CourseDetailsModal.propTypes = {
    setIsModalOpen: PropTypes.func,
    courseDetails : PropTypes.object
}

export default CourseDetailsModal
