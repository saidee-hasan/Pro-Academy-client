import useAxiosPublic from "@/Hooks/useAxiosPublic";
import CourseCard from "../share/CourseCard"
import Title from "../share/Title"
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../share/LoadingSpinner";

const AvailableCourse = () => {

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
    <section className="pt-24">
      <div className="mb-10">
          <Title title={"Available Courses"}></Title>
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
    </section>
  )
}

export default AvailableCourse
