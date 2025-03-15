
import Chart from "@/components/Dashboard/Chart";
import HelmetTitle from "@/components/share/HelmetTitle";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Statistics = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const { data } = await axiosSecure('/users');
          return data;
        },
    });

    const allStudent = users.filter(user => user.role === "Student");

    const { data: courses = [] } = useQuery({
        queryKey: ["total-course"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/courses`);
            return data;
        },
    });

  return (
    <section>

        <HelmetTitle title="Statistics"></HelmetTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

            <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-200 p-4 rounded-lg text-center shadow-xl shadow-blue-900 h-36">
                <h1 className="text-4xl text-white font-bold">Total User</h1>
                <h1 className="mt-2 text-4xl font-semibold text-white">{users.length}</h1>
            </div>

            <div className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-200 p-4 rounded-lg text-center shadow-xl shadow-emerald-900">
                <h1 className="text-4xl text-white font-bold">Total Student</h1>
                <h1 className="mt-2 text-4xl font-semibold text-white">{allStudent.length}</h1>
            </div>

            <div className="bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-200 p-4 rounded-lg text-center shadow-xl shadow-yellow-900">
                <h1 className="text-4xl text-white font-bold">Total Course</h1>
                <h1 className="mt-2 text-4xl font-semibold text-white">{courses.length}</h1>
            </div>

        </div>

        {/* carts and calendar */}
        <div className="mt-16 flex sm:flex-row flex-col gap-16 sm:gap-5  w-full">

            <div>
                <Chart></Chart>
                <h1 className="text-center mt-2 text-xl font-bold">Statistics</h1>
            </div>

            <div className="mt-5">
                <Calendar className="custom-calendar" />
            </div>

        </div>
    </section>
  )
}

export default Statistics
