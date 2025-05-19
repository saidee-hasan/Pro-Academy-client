
import { Link } from "react-router"
import './banner.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import banner from '../../assets/banner.png'

const Banner = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section 
        className="lg:h-[calc(100vh-74px)] bg-cover bg-center bg-no-repeat sm:flex items-center banner">
            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">
                
                <div className="sm:flex items-center justify-between text-white pt-4 lg:pt-0 text-center sm:text-left ">
                    <div data-aos="fade-right"  data-aos-duration="2000" className="lg:w-[45%]">
                        <h1  className="text-5xl text-center sm:text-start font-bold mb-5">
                            <span className="font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">Pro  Academy  - </span>
                            <span className="font-bold"> Learn, Excel, and Build Your Dream Career!</span>
                            <span className="animate-pulse">🚀</span>
                        </h1>
                        <p className="text-gray-300">8 May 2024 Pro  Academy  started
                        From the beginning, our goal was to develop the educated unemployed of the country completely free of cost. And provide guaranteed jobs. Now we are moving forward with this goal. Initially, we started with about 150 students, but some students were serious and in the end, Pro  Academy  was able to arrange their jobs and internships. Thank you all for being with us.</p>
                        
                        <Link to='/courses'>
                            <button className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold py-2 px-4 rounded-md mt-5">View All Course</button>
                        </Link>
                    </div>

                    <div className="lg:w-[50%] lg:h-[500px] sm:-mt-10 " data-aos="fade-left"  data-aos-duration="2000">
                       <img className="" src={banner} alt="" />
                    </div>
                </div>
                
            </div>

        </section>
    )
}

export default Banner
