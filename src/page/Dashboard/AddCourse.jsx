import HelmetTitle from "@/components/share/HelmetTitle";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { imageUpload } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router";

const AddCourse = () => {

  const [loading, setLoading] = useState();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const watchedImage = watch('image');

  const {mutateAsync} = useMutation({
    mutationKey : ['Add-Course'],
    mutationFn : async(courseData) => {
      const {data} = await axiosSecure.post('/courses', courseData);
      return data;
    }
  })

  const onSubmit = async data => {
    setLoading(true);
    const {image} = data;
    const photo = await imageUpload(image);
    data.image = photo;

    try {
      await mutateAsync(data);
      toast.success('Course Added Successfully!');
      navigate('/dashboard/manage-course');
    } catch (error) {
      console.log(`error from post course : ${error}`);
      toast.error('An error occurred! Please try again.')
    }finally{
      setLoading(false);
    }
  }

  return (
    <section>

      <HelmetTitle title="Add Course"></HelmetTitle>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* course name and image */}
        <div className="flex flex-col gap-6 lg:gap-0 sm:flex-row items-center justify-between">

          {/* course name */}
          <div className="lg:w-[48%] w-full">
            <h1 className="font-bold mb-2">Course Name</h1>

            <input 
              type="text" 
              className="w-full p-3 bg-inherit border border-blue-500 outline-0 focus:border-2 rounded-lg"
              placeholder="Enter Course Name" 
              {
                ...register('courseName', {
                  required : "Course Name is Required",
                })
              }
              />
              {
                errors.courseName &&
                <p className='text-xs mt-2 text-red-500'>{errors.courseName.message}</p>
              }
          </div>

          {/* upload Image */}
          <div className='lg:w-[48%] w-full'>
            <h1 className="font-bold mb-2">Course Thumbnail</h1>

            <div className='file_upload p-2 relative border-2 border-dotted border-blue-500 rounded-lg w-full'>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    className='text-sm cursor-pointer w-full hidden'
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    hidden
                    {
                      ...register('image', {
                        required : "Course Thumbnail is Required",
                      })
                    }
                  />
                  <div className='bg-blue-500 text-white border border-blue-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-600 transition'>
                    {watchedImage && watchedImage[0] ? `${watchedImage[0].name.slice(0, 10)}...${watchedImage[0].type}` : "Upload"}
                  </div>
                </label>
              </div>
            </div>
            {
              errors.image &&
              <p className='text-xs mt-2 text-red-500'>{errors.image.message}</p>
            }
          </div>
          
        </div>

        {/* course price and discount */}
        <div className="flex flex-col gap-6 lg:gap-0 sm:flex-row items-center justify-between mt-5">

          {/* course price */}
          <div className="lg:w-[48%] w-full">
            <h1 className="font-bold mb-2">Course Price</h1>

            <input 
              type="number" 
              className="w-full p-3 bg-inherit border border-blue-500 outline-0 focus:border-2 rounded-lg"
              placeholder="Enter Course Price" 
              {
                ...register('coursePrice', {
                  required : "Course Price is Required",
                })
              }
              />
              {
                errors.coursePrice &&
                <p className='text-xs mt-2 text-red-500'>{errors.coursePrice.message}</p>
              }
          </div>

          {/* discount */}
          <div className="lg:w-[48%] w-full">
            <h1 className="font-bold mb-2">Discount</h1>

            <input 
              type="number" 
              className="w-full p-3 bg-inherit border border-blue-500 outline-0 focus:border-2 rounded-lg"
              placeholder="Enter Discount" 
              {
                ...register('discount')
              }
              />
          </div>
          
        </div>

        <div className="w-full mt-5">
            <h1 className="font-bold mb-2">Private Group Link</h1>

            <input 
              type="text" 
              className="w-full p-3 bg-inherit border border-blue-500 outline-0 focus:border-2 rounded-lg"
              placeholder="Enter Private Group Link" 
              {
                ...register('privateGroup',{
                  required : "Private Group is Required",
                })
              }
              />
        </div>
        {
          errors.privateGroup &&
          <p className='text-xs mt-2 text-red-500'>{errors.privateGroup.message}</p>
        }

        {/* course details */}
        <div className="w-full mt-6">
            <h1 className="font-bold mb-2">Course Details</h1>

            <textarea
            className="w-full p-3 border border-blue-500 outline-0 focus:border-2 rounded-lg h-40 bg-[#0000ff13]"
            placeholder="Write Details About The Course..."
            {
              ...register('description', {
                required : "Description is Required",
              })
            }
            ></textarea>
            {
              errors.description &&
              <p className='text-xs mt-2 text-red-500'>{errors.description.message}</p>
            }
        </div>

        <button 
        disabled={loading}
        className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 w-full mt-6 rounded-lg font-bold transition-[0.5s] disabled:cursor-not-allowed disabled:bg-blue-300 text-lg'
        >
            {
                loading ? 
                <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> 
                : 
                "Add Course"
            }
        </button>

      </form>

    </section>
  )
}

export default AddCourse
