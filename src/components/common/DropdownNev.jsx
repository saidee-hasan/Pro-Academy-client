
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMdLogOut } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { TbLayoutDashboard } from "react-icons/tb";
import useRole from "@/Hooks/useRole";

export function DropdownNev() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";
    const [role] = useRole();

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Log out successful");
            navigate(from);
        } catch (error) {
            toast.error(`Log out failed. Please try again. ${error}`);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-12 w-12 flex flex-col items-center">
                    {
                    user ?.photoURL ?
                    <img 
                    className="h-10 w-10 rounded-full" 
                    src={user?.photoURL} 
                    alt="User Avatar" />
                    :
                    <div className="h-10 w-10 rounded-full">
                        <img src=" https://i.ibb.co.com/p6fDkxKQ/Screenshot-2025-03-15-144204-removebg-preview-1.png " />
                    </div>
                    }
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                {
                    role === "Admin" &&
                    <Link to={'/dashboard'}>
                        <DropdownMenuItem>
                            <button className="mx-auto text-lg flex items-center space-x-1">
                                <span><TbLayoutDashboard /></span>
                                <span>Dashboard</span>
                            </button>
                        </DropdownMenuItem>
                    </Link>
                }

                <Link to={'/profile'}>
                <DropdownMenuItem>
                    <button className="mx-auto text-lg flex items-center space-x-1">
                        <span><PiStudentBold  /></span>
                        <span>My Profile</span>
                    </button>
                </DropdownMenuItem>
                </Link>

                <DropdownMenuItem>
                    <button onClick={handleLogOut} className="mx-auto text-lg flex items-center">
                        <span className="font-bold"><IoMdLogOut /></span> 
                        <span>Log out</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
