import CourseCard from "@/components/share/CourseCard";
import HelmetTitle from "@/components/share/HelmetTitle";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import Title from "@/components/share/Title";
import useAxiosPublic from "@/Hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"

const Courses = () => {

    const axiosPublic = useAxiosPublic();

    const {data : courses = [], isLoading} = useQuery({
        queryKey : ['Courses'],
        queryFn : async () => {
            const {data} = await axiosPublic('/courses')
            return data;
        }
    })

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <section className="mt-10 mb-24">

        <HelmetTitle title="All Courses"></HelmetTitle>

        <div className="mb-10">
            <Title title="All Courses"></Title>
        </div>
        
        <div className="max-w-[90%] xl:max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                courses.map(course => (
                    <CourseCard
                    key={course?._id}
                    course={course}
                    >

                    </CourseCard>
                ))
            }
        </div>

        <div className="text-center mt-10">
            <a href="https://www.youtube.com/@VIRTUALACADEMY-BD/playlists" target="_blank">
                <button className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 px-5 mt-5 rounded-lg font-bold transition-[0.5s]">
                    See All Free Course
                </button>
            </a>
        </div>

    </section>
  )
}

export default Courses
