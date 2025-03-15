import DashNav from "@/components/Dashboard/DashNav"
import HelmetTitle from "@/components/share/HelmetTitle"
import { Outlet } from "react-router"

const Dashboard = () => {
  return (
    <section >

        <HelmetTitle title="Dashboard"></HelmetTitle>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

            <div className="lg:w-[22%] lg:h-screen bg-[#0000ff1a] px-4 lg:py-10 py-2 sticky top-0 z-50 backdrop-blur-lg lg:overflow-auto scrollbar-thin scrollbar-track-blue-300 scrollbar-thumb-blue-800">
                <DashNav></DashNav>
            </div>

            <div className="lg:w-[85%] pr-0 lg:pr-5 w-[90%] mx-auto lg:py-10 pb-10 ">
                <Outlet></Outlet>
            </div>

        </div>
        
    </section>
  )
}

export default Dashboard
