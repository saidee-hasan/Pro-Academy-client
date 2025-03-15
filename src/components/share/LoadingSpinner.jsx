
import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = () => {
    return (
    <div
        className={`
        flex 
        flex-col 
        justify-center 
        items-center 
        h-screen
        `}
    >
        <ScaleLoader size={100} color='blue' />
    </div>
    )
}


export default LoadingSpinner
