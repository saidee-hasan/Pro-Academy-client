import { Link } from "react-router"
import logo from '../../assets/logo.jpg'

const Logo = () => {
  return (
    <Link to={'/'}>
        <div className='flex space-x-1 items-center'>
            <img src={logo} className='h-12 w-12 rounded-full' alt="" />
            <h1 className='font-bold text-lg hidden sm:block'>Pro  Academy </h1>
        </div>
    </Link>
  )
}

export default Logo
