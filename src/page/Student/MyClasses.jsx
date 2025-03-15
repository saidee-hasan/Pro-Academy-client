import MyCourseCard from "@/components/Student/MyCourseCard";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const MyClasses = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data : myCourse = []} = useQuery({
        queryKey : ['my-course'],
        queryFn : async () => {
            const {data} = await axiosSecure(`/course-request/my-course/${user?.email}`)
            return data;
        }
    })

    const acceptedCourse = myCourse.filter(c => c.status === 'Accepted');

  return (
    <section className="pb-24 mt-10">

        <h1 className="max-w-[90%] xl:max-w-[1200px] mx-auto mb-8 text-2xl text-purple-200 font-semibold">Welcome back <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">{user?.displayName}</span>, ready for your next lesson?</h1>

        <div className="max-w-[90%] xl:max-w-[1200px] mx-auto flex flex-col gap-8">
            
            {
                acceptedCourse.map(course => (
                    <MyCourseCard 
                    key={course?._id}
                    course={course}
                    ></MyCourseCard>
                ))
            }

        </div>

      
    </section>
  )
}

export default MyClasses
