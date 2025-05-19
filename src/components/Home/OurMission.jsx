import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { AiOutlineSolution } from "react-icons/ai";
import { SiFuturelearn } from "react-icons/si";
import { IoCloudDone } from "react-icons/io5";
import { FaAccessibleIcon } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import Title from "../share/Title";

const OurMission = () => {

    useEffect(() => {
                AOS.init();
    }, []);
    

    return (
        <section id="about" className="py-24">
            
            <div className="mb-14">
                <Title title='Our Mission And Vision'></Title>
            </div>

            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    
                    <div data-aos="fade-up" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:bg-gradient-to-tr hover:from-stone-700 hover:to-[#101829] transition">
                        <div>
                            <AiOutlineSolution className="mx-auto text-6xl text-orange-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Empower Lifelong Learning</h1>
                        <p className="text-gray-400">Encouraging individuals to continuously develop new skills and adapt to evolving job market trends for sustained career success.</p>
                    </div>

                    <div data-aos="fade-up" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:bg-gradient-to-tr hover:from-stone-700 hover:to-[#101829] transition">
                        <div>
                            <IoCloudDone className="mx-auto text-6xl text-blue-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Enhance Digital Literacy.</h1>
                        <p className="text-gray-400">Offering comprehensive digital training programs that equip learners with essential technological skills to thrive in the digital age.</p>
                    </div>

                    <div data-aos="fade-up" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:bg-gradient-to-tr hover:from-stone-700 hover:to-[#101829] transition">
                        <div>
                            <FaFileCircleQuestion className="mx-auto text-6xl text-rose-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Bridge the Skills Gap</h1>
                        <p className="text-gray-400">Aligning education with industry requirements by providing relevant, hands-on training to create a highly skilled workforce.</p>
                    </div>

                    <div data-aos="fade-up" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:bg-gradient-to-tr hover:from-stone-700 hover:to-[#101829] transition">
                        <div>
                            <SiFuturelearn className="mx-auto text-6xl text-teal-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Create New Job Opportunities</h1>
                        <p className="text-gray-400">Fostering job creation through comprehensive training and skill development.</p>
                    </div>

                    <div data-aos="fade-up" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:bg-gradient-to-tr hover:from-stone-700 hover:to-[#101829] transition">
                        <div>
                            <FaPeopleGroup className="mx-auto text-6xl text-green-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Convert Unemployment to Skills</h1>
                        <p className="text-gray-400">Equipping unemployed individuals with the skills they need to thrive in the job market.</p>
                    </div>

                    <div data-aos="fade-up" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:bg-gradient-to-tr hover:from-stone-700 hover:to-[#101829] transition">
                        <div>
                            <FaAccessibleIcon className="mx-auto text-6xl text-pink-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Support Entrepreneurial Growth</h1>
                        <p className="text-gray-400">Equipping aspiring entrepreneurs with knowledge and resources to succeed.</p>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default OurMission