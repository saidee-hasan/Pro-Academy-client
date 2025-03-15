
import HelmetTitle from "@/components/share/HelmetTitle"
import { Link } from "react-router"


const Error = () => {
    return (
        <div className="bg-black flex flex-col items-center justify-center h-[100vh]">
            <HelmetTitle title='Error'></HelmetTitle>

            <div className="text-white flex items-center">
                <h1 className="text-3xl font-bold border-r border-gray-500 pr-5">404</h1>
                <p className="pl-5">This page could not be found.</p>
            </div>

            <Link to={'/'}>
                <button className="py-2 px-5 bg-blue-500 rounded-lg hover:bg-blue-700 font-bold text-xl text-white mt-5">Back to home</button>
            </Link>
        </div>
    )
}

export default Error
