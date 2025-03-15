import { useState } from "react"
import DashNavItem from "../share/DashNavItem"

import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { MdAssignmentAdd } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaStackOverflow } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import Logo from "../share/Logo";

const DashNav = () => {

    const [isOpen, setIsOpen] = useState(false);

    const dashNavItems = <>
        <li>
            <DashNavItem 
            navName="Statistics" 
            setIsOpen={setIsOpen}
            address="/dashboard/statistics"
            icon={<FaStackOverflow />}
            ></DashNavItem>
        </li>

        <li>
            <DashNavItem 
            navName="All User" 
            setIsOpen={setIsOpen}
            address="/dashboard/all-user"
            icon={<FaUsers />}
            ></DashNavItem>
        </li>

        <li>
            <DashNavItem 
            navName="Add Course" 
            setIsOpen={setIsOpen}
            address="/dashboard/add-course"
            icon={<MdOutlineAddToPhotos />}
            ></DashNavItem>
        </li>

        <li>
            <DashNavItem 
            navName="Manage Course" 
            setIsOpen={setIsOpen}
            address="/dashboard/manage-course"
            icon={<MdAssignmentAdd />}
            ></DashNavItem>
        </li>

        <li className="pb-3">
            <DashNavItem 
            navName="Enroll Request" 
            setIsOpen={setIsOpen}
            address="/dashboard/enroll-request"
            icon={<VscGitPullRequestNewChanges />}
            ></DashNavItem>
        </li>

        <li className="border-t-2 pt-8">
            <DashNavItem 
            navName="Home" 
            setIsOpen={setIsOpen}
            address="/"
            icon={<IoHome />}
            ></DashNavItem>
        </li>

        <li>
            <DashNavItem 
            navName="Courses" 
            setIsOpen={setIsOpen}
            address="/courses"
            icon={<FaDiscourse />}
            ></DashNavItem>
        </li>

    </>

  return (
    <div className="flex justify-between items-center">

        <div className="lg:hidden">
            <Logo></Logo>
        </div>
        
        <ul className="text-xl lg:flex flex-col gap-5 hidden">
            {dashNavItems}
        </ul>

        <div className='lg:hidden'>
            <button className='text-3xl font-bold' onClick={() => setIsOpen(!isOpen)}>
                { isOpen ?
                    <RxCross2 />
                    :
                    <RiMenu3Fill/>
                }
            </button>
        </div>

        {
            isOpen &&
            <div className="absolute top-14 w-full right-0 lg:hidden block bg-[#030922ed] h-screen overflow-auto scrollbar-thin scrollbar-track-blue-300 scrollbar-thumb-blue-800 p-5">
                <nav>
                    <ul className='flex flex-col text-center space-y-4 font-semibold'>
                        {dashNavItems}
                    </ul>
                </nav>
            </div>
        }

    </div>
  )
}

export default DashNav
