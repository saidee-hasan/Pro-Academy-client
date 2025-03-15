import LoadingSpinner from "@/components/share/LoadingSpinner";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router"
import logo from '../../assets/logo.jpg'
import OurMission from "@/components/Home/OurMission";
import Faq from "@/components/Home/Faq";
import HelmetTitle from "@/components/share/HelmetTitle";
import { useState } from "react";
import CourseDetailsModal from "@/Modal/CourseDetailsModal";
import useAuth from "@/Hooks/useAuth";

const CourseDetails = () => {

    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    const {data : courseDetails = {}, isLoading} = useQuery({
      queryKey : ['course-details'],
      queryFn : async() => {
        const {data} = await axiosPublic(`/courses/${id}`);
        return data;
      }
    })

    const {courseName, coursePrice, discount, description} = courseDetails;

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
      <section className="pt-10">

        <HelmetTitle title="Course Details"></HelmetTitle>

        <div className="max-w-[90%] xl:max-w-[1200px] mx-auto text-center border border-blue-800 py-5 rounded-xl shadow-lg shadow-blue-500 bg-gradient-to-tr">

          <img className="h-20 w-20 rounded-full mx-auto" src={logo} alt="" />

          <h1 className="text-4xl sm:text-5xl font-bold mt-5 sm:max-w-3xl mx-auto">
            <span className="text-gray-300">Unlock Your Potential with</span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400"> {courseName}</span>
          </h1>

          <p className=" mx-auto mt-5 text-gray-300 text-lg">{description}</p>

          <p className="text-pink-600 line-through text-3xl font-semibold mt-3">{coursePrice}৳</p>

          <button 
          onClick={() => {
            if(!user){
              return navigate('/login')
            }
            setIsModalOpen(true)
          }}
          className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 px-5 mt-5 rounded-lg font-bold transition-[0.5s]">
            Enroll Now | {discount}৳
          </button>

        </div>


        {/* modal */}
        {
          isModalOpen && 
          <CourseDetailsModal
          setIsModalOpen={setIsModalOpen}
          courseDetails={courseDetails}
          ></CourseDetailsModal>
        }

        {/* our mission */}
        <OurMission></OurMission>

        {/* frequently question */}
        <Faq></Faq>

      </section>
    )
}

export default CourseDetails
