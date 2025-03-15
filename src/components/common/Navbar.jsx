import { Link } from 'react-router'
import NavItem from '../share/NavItem'
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import Logo from '../share/Logo';
import useAuth from '../../Hooks/useAuth';
import { DropdownNev } from './DropdownNev';
import useRole from '@/Hooks/useRole';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();
    const [role] = useRole();


    const navItems = <>

        <li><NavItem address='/' navName={'Home'} setIsOpen={setIsOpen}></NavItem></li>
        <li><NavItem address='/courses' navName={'Courses'} setIsOpen={setIsOpen}></NavItem></li>
        {
            role === "Student" &&
            <li><NavItem address='/my-classes' navName={'My Classes'} setIsOpen={setIsOpen}></NavItem></li>
        }

        {/* authentication related buttons */}
        {
            user ? 
            <DropdownNev></DropdownNev>
            :
            <>
                <li>
                    <Link to={'/login'}>
                        <button 
                        className='border border-gray-500 py-2 px-5 rounded-3xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-400 transition'
                        >
                            Login
                        </button>
                    </Link>
                </li>

                <li>
                    <Link to={'/register'}>
                        <button 
                        className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold py-2 px-5 rounded-3xl'
                        >
                            Register
                        </button>
                    </Link>
                </li>
            </>
        }

    </>

  return (
    <section className='bg-[#030922] py-3 font-semibold border-b border-gray-700'>
        <div className='flex justify-between items-center max-w-[90%] xl:max-w-[1200px] mx-auto'>

            <Logo></Logo>

            <nav className='hidden lg:block'>
                <ul className='flex items-center space-x-5'>
                    {navItems}
                </ul>
            </nav>

            <div className='lg:hidden'>
               <button 
               onClick={() => setIsOpen(!isOpen)}
               >
                    {
                    isOpen ? 
                    <RxCross2 className='text-3xl' />
                    :
                    <RiMenu3Fill className='text-3xl' />
                    }
                </button>

            </div>

            {isOpen && 
                <div
                className={`absolute top-16 mt-2 min-h-[calc(100vh-73px)] right-0 bg-[#030922ed] w-full shadow-lg flex flex-col items-center justify-center space-y-4 p-4 text-center`}>
                    <ul className='flex flex-col items-center space-y-5'>
                        {navItems}
                    </ul>
                </div>
            }

        </div>
    </section>
  )
}

export default Navbar
