import LoadingSpinner from "@/components/share/LoadingSpinner";
import useRole from "@/Hooks/useRole"
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types'

const StudentRoute = ({children}) => {

    const [role, isLoading] = useRole();
    const location = useLocation();

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    if(role === "Student") return children;

    return <Navigate to={'/'} state={location.pathname} replace={true}></Navigate>

}

StudentRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default StudentRoute
