
import HelmetTitle from '../../components/share/HelmetTitle';
import Logo from '../../components/share/Logo';


const ForgotPass = () => {

    return (
        <div className="flex items-center justify-center min-h-screen">

            <HelmetTitle title={'Forgot password'}></HelmetTitle>

            <div className='border border-gray-500 shadow-xl rounded-lg w-[90%] sm:w-[500px] p-8 bg-gradient-to-t from-[#0C1725] to-[#0E272B]'>

                <div className='flex items-center justify-center'>
                    <Logo></Logo>
                </div>
                
                <div>
                    <h1 className='font-bold text-blue-500 text-4xl text-center mb-6'>Forgot password</h1>
                </div>

                <div>

                    <form>

                        <div className='mt-4'>
                            <label 
                            className='text-white font-semibold' 
                            htmlFor="email">
                                Email 
                                <span className='text-red-500 text-2xl font-bold'>*</span>
                            </label>
                            <br></br>

                            <input 
                            type='email'
                            className='w-full bg-inherit border-b-2  border-gray-700 focus:border-blue-500 focus:outline-0' 
                            />
                            <p className='text-gray-400 text-xs mt-1'>Enter Your Email.</p>
                        </div>

                        <button 
                        className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 w-full mt-5 rounded-lg font-bold border border-gray-500 transition-[0.5s] disabled:cursor-not-allowed disabled:bg-blue-300'>
                            {/* {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Send Reset Email'} */}
                            Send Reset Email
                        </button>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default ForgotPass
