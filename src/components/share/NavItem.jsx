import { NavLink } from "react-router"
import PropTypes from 'prop-types'

const NavItem = ({address, navName, setIsOpen}) => {
  return (
    <NavLink
    to={address}
    className={'hover:text-blue-500 transition'}
    onClick={() => setIsOpen(false)}
    >
        {navName}
    </NavLink>
  )
}

NavItem.propTypes = {
    address: PropTypes.string,
    navName: PropTypes.string,
    setIsOpen: PropTypes.func,
}

export default NavItem
