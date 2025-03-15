import HelmetTitle from "@/components/share/HelmetTitle";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";


const EnrollRequest = () => {

    const axiosSecure = useAxiosSecure();

    const { data: enrollRequests = [], refetch } = useQuery({
        queryKey: ["all-requested-course"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/course-request`);
            return data;
        },
    });

    const handleDelete = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Reject!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosSecure.delete(`/course-request/${id}`);
            await refetch();
            toast.success("Rejected Request")
          }
        });
    }

    const handleAccept = async(id, email) => {
        try {
            await axiosSecure.patch(`/course-request/${id}`, {status : "Accepted"});
            await axiosSecure.patch(`/users/email/${email}`, {role : 'Student'})
            await refetch();
            toast.success('Request Accepted!')
        } catch (error) {
            console.log(`error form update request ${error}`);
            toast.error('Request failed. Please try again.')
        }
    }

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((_,rowIndex) => rowIndex + 1, {
            id : "serial",
            header : () => (<p className="text-center">S/N</p>),
            cell : (info) => info.getValue()
        }),

        columnHelper.accessor('image', {
          header : () => (<p className="text-center">Thumbnail</p>),
          cell : (info) => (
              <img className="h-12 w-12 rounded-lg mx-auto" src={info.getValue()} alt="" />
          )
        }),

        columnHelper.accessor('courseName', {
          header : () => (<p className="text-center">Course Name</p>),
          cell : (info) => info.getValue()
        }),

        columnHelper.accessor('student.name', {
          header : () => (<p className="text-center">Student Name</p>),
          cell : (info) => info.getValue()
        }),

        columnHelper.accessor('student.email', {
          header : () => (<p className="text-center">Student Email</p>),
          cell : (info) => info.getValue()
        }),

        columnHelper.accessor('phoneNumber', {
            header : () => (<p className="text-center">Phone Number</p>),
            cell : (info) => { return <p className="font-mono">{info.getValue()}</p>}
        }),

        columnHelper.accessor('transactionID', {
            header : () => (<p className="text-center">TransactionID</p>),
            cell : (info) => info.getValue()
        }),

        columnHelper.accessor('status', {
            header : () => (<p className="text-center">Status</p>),
            cell : (info) => { return <p className="text-orange-500 font-bold">{info.getValue()}</p>}
        }),

        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Actions</p>,
            cell: ({ row }) => {
        
                return (
                    <div className="flex gap-2 justify-around items-center">
                            <button
                                onClick={() => handleAccept(row.original._id, row.original.student.email)}
                                className="p-2 rounded-lg bg-[#0000ff5d] hover:bg-[#0000ff6b] transition font-bold"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => handleDelete(row.original._id)}
                                className="p-2 rounded-lg font-semibold bg-[#ff000052] hover:bg-[#651010b0] transition"
                            >
                                Reject
                            </button>
                    </div>
                );
            }
        })
    ]
    
    const table = useReactTable({
        data : enrollRequests,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(),
        getPaginationRowModel : getPaginationRowModel()
    })


    return (
        <section className="pb-16">
            <HelmetTitle title="Enroll Request"></HelmetTitle>

            <div className="bg-[#07075f61] p-5 rounded-lg overflow-x-auto rounded-t-lg scrollbar-thin scrollbar-track-[#020617] scrollbar-thumb-blue-500 ">
                <div>
                    {
                        enrollRequests.length === 0 ? (
                            <p className="text-center text-3xl text-red-500 font-semibold mt-4">No Enroll Request</p>
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
                enrollRequests.length > 10 && (
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

export default EnrollRequest;
