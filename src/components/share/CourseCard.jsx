
import { Link } from "react-router"
import PropTypes from 'prop-types'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const CourseCard = ({course}) => {

    const {courseName, image, coursePrice, discount, description, _id} = course;

    useEffect(() => {
                AOS.init();
    }, []);

    return (
        <Link to={`/course-details/${_id}`}>
            <div data-aos="fade-up"  data-aos-duration="2000" className="shadow-xl border border-gray-600 rounded-lg transition font-semibold">
                <div>
                    <img className="rounded-t-lg h-[250px] w-full" src={image} alt="" />
                </div>

                <div className="bg-[#0A1022] px-3 pb-5 pt-2 rounded-b-lg">
                    <div className="pt-2 pb-2">
                        <h3 className="font-bold font-serif text-xl">{courseName}</h3>
                    </div>

                    <div className="pt-2">
                        <h3 className="text-gray-300">
                            {description.slice(0, 80)}...
                        </h3>
                    </div>

                    <div className="pt-2">
                        <h3 className="text-xl font-mono">
                            <span className="text-yellow-600 line-through">{coursePrice}</span>
                            <span className="text-blue-500"> {discount}৳</span>
                        </h3>
                    </div>

                </div>
            </div>
        </Link>
    )
}

CourseCard.propTypes = {
    course: PropTypes.object,
}

export default CourseCard
