import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

// import components
import Navbar from "../components/Navbar"
import PeopleList from '../components/PeopleList'


// fetch people
const FETCH_PEOPLE = gql`
  query fetchPeople($token: String!, $page: Int!) {
    people(token: $token, page: $page) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`

const People = () => {

  const [pageNumber, setPageNumber] = useState(1)

  // function to increase the page count
  const handlePositivePageChange = () => {
    setPageNumber(pageNumber + 1)
  }

  // function to decrease the page count
  const handleNegativePageChange = () => {
    setPageNumber(pageNumber - 1)
  }

  // execute the fetch people query
  const { loading, errors, data } = useQuery(FETCH_PEOPLE, {
    variables: { token: localStorage.getItem("user-token"), page: pageNumber }
  })

  if (loading) return (
    <>
      <Navbar />
      <div className='text-center my-10 text-2xl'>Loading...</div>
    </>
  )

  if (errors) return (
    <>
      <Navbar />
      <div className='text-center my-10'>{errors}</div>
    </>
  )


  return <>
    <Navbar />

    <p className='font-bold container-fluid px-10 mt-4 text-2xl'>Viewing People</p>

    <div className='container-fluid px-10 my-6 flex flex-row flex-wrap'>
      {data ? data.people.map((person, index) => {
        return (
          <PeopleList key={index} person={person} />
        )
      }) : "no data"}
    </div>

    <div className='flex justify-center'>
      <button disabled={pageNumber < 2} onClick={handleNegativePageChange} href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Previous
      </button>


      <button disabled={pageNumber > 8} onClick={handlePositivePageChange} href="#" className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
      </button>
    </div>
  </>
}

export default People