import React from 'react'

import {BsFillPeopleFill} from "react-icons/bs"

const Navbar = () => {
    return (
        <>

            <nav className="bg-blue-800 text-white px-2 sm:px-10 py-4 dark:bg-gray-800">
                <div className="container-fluid flex flex-wrap justify-between items-center mx-auto">
                    <div className="flex items-center">
                        <BsFillPeopleFill className="mr-3 text-2xl"/>
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">People</span>
                    </div>
                    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            {localStorage.getItem("username") ? localStorage.getItem("username"): "" }
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar