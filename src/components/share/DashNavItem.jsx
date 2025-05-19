import { NavLink } from "react-router"
import PropTypes from 'prop-types'

const DashNavItem = ({address, navName, setIsOpen, icon}) => {
  return (
    <NavLink
    to={address}
    className={
        ({isActive}) => isActive ? "transition font-bold text-blue-500 flex items-center gap-3" : 'hover:text-blue-500 transition font-bold text-gray-200 flex items-center gap-3'
    }
    onClick={() => setIsOpen(false)}
    >
        <h1>{icon}</h1>
        <h1>{navName}</h1>
    </NavLink>
  )
}

DashNavItem.propTypes = {
    address: PropTypes.string,
    navName: PropTypes.string,
    setIsOpen: PropTypes.func,
    icon: PropTypes.element,
}

export default DashNavItem
