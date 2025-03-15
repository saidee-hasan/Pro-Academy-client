
import PropTypes from 'prop-types'

const Title = ({title}) => {

    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">{title}</h1>
            <div className="border border-dotted border-blue-500 w-64 mx-auto"></div>
            <div className="border border-dotted border-blue-500 w-56 mx-auto mt-1"></div>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string,
}

export default Title