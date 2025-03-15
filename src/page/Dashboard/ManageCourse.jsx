

import HelmetTitle from "@/components/share/HelmetTitle";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";


const ManageCourse = () => {

    const axiosSecure = useAxiosSecure();

    const { data: manageCourses = [], refetch } = useQuery({
        queryKey: ["manage-course"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/courses`);
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
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosSecure.delete(`/courses/${id}`);
            await refetch();
            toast.success("Delete Course successfully!")
          }
        });
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

        columnHelper.accessor('discount', {
            header : () => (<p className="text-center">Price</p>),
            cell : (info) => info.getValue()
        }),

        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Actions</p>,
            cell: ({ row }) => {
        
                return (
                    <div className="flex gap-2 justify-around items-center">
                            <Link to={`/dashboard/update-course/${row.original._id}`}>
                              <button
                                  className="p-2 rounded-lg font-semibold bg-[#0000ff44] text-blue-400 hover:bg-[#0000ff6b] transition text-3xl"
                              >
                                  <FaPencilAlt />
                              </button>
                            </Link>

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
        data : manageCourses,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(),
        getPaginationRowModel : getPaginationRowModel()
    })


    return (
        <section className="pb-16">
            <HelmetTitle title="Manage Course"></HelmetTitle>

            <div className="bg-[#07075f61] p-5 rounded-lg">
                <div className="lg:overflow-hidden overflow-x-auto rounded-t-lg">
                    {
                        manageCourses.length === 0 ? (
                            <p className="text-center text-3xl text-red-500 font-semibold mt-4">No COURSE ADDED</p>
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
                manageCourses.length > 10 && (
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

export default ManageCourse;
