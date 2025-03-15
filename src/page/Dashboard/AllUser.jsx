

import HelmetTitle from "@/components/share/HelmetTitle";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";


const AllUser = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users`);
            return data;
        },
    });

    const handleAdmin = (id) => {
        axiosSecure.patch(`/users/${id}`, { role : 'Admin' }).then(() => {
            refetch();
        });
        toast.success("Make admin successfully!")
    };

    const handleUser = (id) => {
        axiosSecure.patch(`/users/${id}`, { role : 'User' }).then(() => {
            refetch();
        });
        toast.success("Make user successfully!")
    };

    const handleDelete = async (id) => {
        await axiosSecure.delete(`/users/${id}`);
        await refetch();
        toast.success("Delete user successfully!")
    }

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((_,rowIndex) => rowIndex + 1, {
            id : "serial",
            header : () => (<p className="text-center">S/N</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('name', {
            header : () => (<p className="text-center">Name</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('email', {
            header : () => (<p className="text-center">Email</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('role', {
            header: () => (<p className="text-center">Role</p>),
            cell: (info) => {
                const role = info.getValue();
                return (
                    <p className={`text-center py-1 rounded-lg font-bold ${
                        role === 'Admin' ? 'bg-[#ffa6004b] text-orange-500 font-bold' :
                        role === 'User' ? 'bg-[#0004ff5a] text-blue-400 font-bold' :
                        role === 'Student' ? 'bg-[#f700ff40] text-[#ef25f6ee] font-bold' :
                        'bg-purple-300 text-purple-900 text-xs'
                    }`}>
                        {role === 'Admin' ? 'Admin' :
                            role === 'User' ? 'User' :
                            role === 'Student' ? 'Student' : "Unknown User"
                        }
                    </p>
                );
            }
        }),
        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Actions</p>,
            cell: ({ row }) => {
                const role = row.original.role;
        
                return (
                    <div className="flex gap-2 justify-around items-center">
                        {role === 'User' && (
                            <button
                                onClick={() => handleAdmin(row.original._id, 'Admin')}
                                className="p-2 rounded-lg font-semibold bg-[#ffa60053] text-[#ffa600] hover:bg-[#3b2f1b] transition text-3xl"
                            >
                                <RiAdminFill />
                            </button>
                        )}
                        {role === 'Admin' && (
                            <button
                                onClick={() => handleUser(row.original._id, 'User')}
                                className="p-2 rounded-lg font-semibold bg-[#0000ff44] text-blue-400 hover:bg-[#0000ff6b] transition text-3xl"
                            >
                                <FaUsers />
                            </button>
                        )}

                            <button
                                onClick={() => handleDelete(row.original._id)}
                                className="p-2 rounded-lg font-semibold bg-[#ff000052] text-red-500 hover:bg-[#651010b0] transition text-3xl"
                            >
                                <MdDeleteForever />
                            </button>
                    </div>
                );
            }
        })
    ]
    
    const table = useReactTable({
        data : users,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(),
        getPaginationRowModel : getPaginationRowModel()
    })


    return (
        <section className="pb-16">
            <HelmetTitle title="All User"></HelmetTitle>

            <div className="bg-[#07075f61] p-5 rounded-lg">
                <div className="lg:overflow-hidden overflow-x-auto rounded-t-lg">
                    {
                        users.length === 0 ? (
                            <p className="text-center text-3xl text-red-500 font-semibold mt-4">NO USERS ADDED</p>
                        ) : (
                            <table className="w-full text-center bg-[#00048013] font-semibold">
                                <thead className="text-center bg-[#0b0b6c] text-white">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <th
                                                    key={header.id}
                                                    className={` px-4 py-4 text-left cursor-pointer ${
                                                        header.column.getIsSorted() ? "bg-[#0b0b6c] text-white" : ""
                                                    }`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <div className="flex items-center justify-center">
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <span className="ml-2">
                                                            {{
                                                                asc: <span className="text-blue-500 text-lg">🔼</span>,
                                                                desc: <span className="text-red-500 text-lg">🔽</span>,
                                                            }[header.column.getIsSorted()] || (
                                                                <span className="text-gray-400 text-lg">↕️</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <tr className="even:bg-[#07075f8c]" key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className=" px-4 py-2">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>

            {/* pagination */}
            
            {
                users.length > 10 && (
                    <div className="flex justify-end space-x-5 items-center mt-4">
                        <button 
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="py-2 sm:px-5 px-3 rounded-3xl bg-blue-600 text-white flex items-center space-x-1 disabled:bg-blue-400 disabled:cursor-not-allowed">
                            <h1 className="text-lg"><MdKeyboardDoubleArrowLeft /></h1>
                            <h1>Previous</h1>
                        </button>

                        <span className="font-semibold">
                            {table.getState().pagination.pageIndex + 1} / {" "} {table.getPageCount()}
                        </span>

                        <button 
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="py-2 sm:px-5 px-3 rounded-3xl bg-blue-500 text-white flex items-center space-x-1 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            <h1>Next</h1>
                            <h1 className="text-lg"><MdKeyboardDoubleArrowRight /></h1>
                        </button>
                    </div>
                )
            }

        </section>
    );
};

export default AllUser;
