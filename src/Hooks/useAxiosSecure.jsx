
import axios from "axios"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import useAuth from "./useAuth"

const axiosSecure = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
        res => {
            return res
        },
        async error => {
            if (error.response.status === 401 || error.response.status === 403) {
            await logOut()
            navigate('/login')
            }
            return Promise.reject(error)
        }
        )
    }, [logOut, navigate])
    return axiosSecure;
}

export default useAxiosSecure
