import PropTypes from 'prop-types'

const MyCourseCard = ({course}) => {

    const {image, courseName, privateGroup} = course;

  return (
    <div>
      
        <div className="flex flex-col sm:flex-row gap-10 bg-[#0000ff1d] border border-[#0000ff7f] hover:border-blue-700 rounded-lg p-8">
            <div>
                <img src={image} className="h-56 w-96 rounded-lg" alt="" />
            </div>

            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-gray-400">{courseName}</span></h1>

                <div className="mt-5 flex flex-col sm:flex-row gap-5">
                    <a href={privateGroup} target="_blank">
                        <button className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold py-2 px-4 rounded-md">
                                Continue Class
                        </button>
                    </a>

                    <a href={privateGroup} target="_blank">
                        <button className="bg-gradient-to-r from-pink-700 to-pink-400 hover:from-pink-400 hover:to-pink-700 transition-[0.5s] font-semibold py-2 px-4 rounded-md">
                            Join Private Group
                        </button>
                    </a>
                </div>
            </div>
        </div>

    </div>
  )
}

MyCourseCard.propTypes = {
    course: PropTypes.object,
}

export default MyCourseCard
