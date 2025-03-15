import useAuth from "@/Hooks/useAuth"
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types'
import LoadingSpinner from "@/components/share/LoadingSpinner";

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user) return children;

    return <Navigate to={'/login'} state={location.pathname} replace={true}></Navigate>

}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute
