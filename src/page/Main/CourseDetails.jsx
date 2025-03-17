import LoadingSpinner from "@/components/share/LoadingSpinner";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import logo from '../../assets/logo.jpg';
import OurMission from "@/components/Home/OurMission";
import Faq from "@/components/Home/Faq";
import HelmetTitle from "@/components/share/HelmetTitle";
import { useState, useEffect } from "react"; // Import useEffect
import CourseDetailsModal from "@/Modal/CourseDetailsModal";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const CourseDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch the user's enrolled courses
    const { data: myCourse = [], isLoading: isMyCourseLoading } = useQuery({
        queryKey: ['my-course', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/course-request/my-course/${user?.email}`);
            return data;
        },
        enabled: !!user, // Only fetch if the user is logged in
    });

    // Fetch course details
    const { data: courseDetails = {}, isLoading: isCourseLoading } = useQuery({
        queryKey: ['course-details', id],
        queryFn: async () => {
            const { data } = await axiosPublic(`/courses/${id}`);
            return data;
        },
    });

    const { courseName, coursePrice, discount, description } = courseDetails;

    // Check if the user has already enrolled in this course
    const isAlreadyEnrolled = myCourse.some(
        (course) => course.courseId === id
    );

    // Filter accepted courses
    const acceptedCourse = myCourse.filter(c => c.status === 'Accepted' && c.courseId === id);

    // Redirect to /my-classes if the course is accepted
    useEffect(() => {
        if (acceptedCourse.length > 0) {
            navigate('/my-classes');
        }
    }, [acceptedCourse, navigate]);

    if (isMyCourseLoading || isCourseLoading) return <LoadingSpinner />;

    return (
        <section className="pt-10 bg-black min-h-screen text-white">
            <HelmetTitle title="Course Details" />

            {/* Hero Section */}
            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto text-center border border-blue-800 py-10 rounded-xl shadow-lg shadow-blue-500 bg-gradient-to-tr">
                <img className="h-24 w-24 rounded-full mx-auto border-4 border-white shadow-lg" src={logo} alt="Course Logo" />

                <h1 className="text-4xl sm:text-6xl font-bold mt-8 sm:max-w-3xl mx-auto">
                    <span className="text-gray-100">Unlock Your Potential with </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                        {courseName}
                    </span>
                </h1>

                <p className="mx-auto mt-6 text-gray-200 text-xl max-w-2xl">
                    {description}
                </p>

                <div className="mt-8">
                    <p className="text-pink-400 line-through text-3xl font-semibold">
                        {coursePrice}৳
                    </p>
                    <p className="text-green-400 text-4xl font-bold mt-2">
                        Enroll Now for Only {discount}৳
                    </p>
                </div>

                {isAlreadyEnrolled ? (
                    <button
                        disabled
                        className="bg-gray-700 text-white py-3 px-8 mt-8 rounded-lg font-bold text-xl cursor-not-allowed shadow-lg"
                    >
                        🎉 Already Enrolled
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (!user) {
                                return navigate('/login');
                            }
                            setIsModalOpen(true);
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-3 px-8 mt-8 rounded-lg font-bold text-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        🚀 Enroll Now | {discount}৳
                    </button>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <CourseDetailsModal
                    id={id}
                    setIsModalOpen={setIsModalOpen}
                    courseDetails={courseDetails}
                />
            )}

            {/* Our Mission */}
            <OurMission />

            {/* Frequently Asked Questions */}
            <Faq />
        </section>
    );
};

export default CourseDetails;