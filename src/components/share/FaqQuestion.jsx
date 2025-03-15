

import PropTypes from 'prop-types'
import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const FaqQuestion = ({question, ans}) => {

    const [isOpen, setIsOpen] = useState(false);

    

    return (
        <div onClick={() => setIsOpen(!isOpen)} className="text-start mx-auto border-b border-gray-700 pb-4 cursor-pointer">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-300">{question}</h3>
                <button>
                    {isOpen ? <IoIosArrowDown /> : <IoIosArrowBack />}
                </button>
            </div>

            {
                isOpen 
                && 
                <p className="mt-2 text-gray-400">{ans}</p>
            }
        </div>
    )
}

FaqQuestion.propTypes = {
    question : PropTypes.string,
    ans : PropTypes.string,
}

export default FaqQuestion
