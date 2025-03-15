import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Ensure the query runs only when user.email is available
    const { data: role = "guest", isLoading } = useQuery({
        queryKey: ["role", user?.email], // Using user.email to generate the query key
        queryFn: async () => {
            if (!user?.email) {
                throw new Error("User email is missing");
            }
            const { data } = await axiosSecure(`/users/${user.email}`);
            return data?.role || "guest"; // Return "guest" if role is undefined
        },
        enabled: !!user?.email, // Only run the query if user.email is available
    });

    return [role, isLoading];
};

export default useRole;
