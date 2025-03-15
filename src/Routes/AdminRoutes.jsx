import LoadingSpinner from "@/components/share/LoadingSpinner";
import useRole from "@/Hooks/useRole"
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types'

const AdminRoutes = ({children}) => {
    
    const [role, isLoading] = useRole();
    const location = useLocation();

    if(isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(role === "Admin"){
        return children;
    }

    return <Navigate to={'/'} state={location.pathname} replace={true}></Navigate>
    
}

AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AdminRoutes
