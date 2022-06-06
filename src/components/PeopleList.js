import React from 'react'
import { Link } from "react-router-dom"

import { FaUserTag } from 'react-icons/fa'

const PeopleList = (props) => {

    return (
        <div className='w-full sm:w-4/12 flex items-center cursor-pointer gap-8 drop--shadow my-2 p-2'>
            <div className='flex gap-4 items-center justify-start'>
                <FaUserTag className='text-9xl mr-8' />
                <div>
                    <div className='text-xl'>
                        <label>Name: </label>
                        {props.person.name}
                    </div>
                    <div className='text-xl'>
                        <label>Gender: </label>
                        {props.person.gender}
                    </div>
                    <Link to={`/person/${props.person.name}`}>
                        <button type="submit" className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-20 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View Details
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default PeopleList