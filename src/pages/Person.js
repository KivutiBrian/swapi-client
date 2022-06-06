import React from 'react'
import Navbar from '../components/Navbar'

import { gql, useQuery } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'

import { FaUserTag } from 'react-icons/fa'
import { IoArrowBackSharp } from 'react-icons/io5'

const FETCH_PERSON = gql`
  query fetchPerson($token: String!, $name: String!) {
    person(token: $token, name: $name) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`



const Person = () => {

  const location = useLocation().pathname.split("/")[2]
  const navigate = useNavigate()


  let username = "";

  // check if the username contains some character anf format it to a valid string
  if (location.includes("%20")) {
    const newLocation = location.split("%20")
    username = `${newLocation[0]} ${newLocation[1]}`
  } else {
    username = location
  }

  // execute the query for getting a single person
  const { loading, errors, data } = useQuery(FETCH_PERSON, {
    variables: { token: localStorage.getItem("user-token"), name: username }
  })

  const handleSubmit = () => {
    navigate("/", { replace: true })
  }

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

    <button onClick={handleSubmit} className='text-blue-800 flex gap-2 items-center mt-10 px-10'>
      <IoArrowBackSharp />
      <div>Go back</div>
    </button>

    {data ? (
      <div className='w-full sm:w-4/12 mx-auto drop--shadow my-2 p-2'>
        <div className='flex justify-center items-center gap-4'>
          <FaUserTag className='text-9xl' />
          <div>
            <div className='flex items-center gap-2'>
              <label className='text-2xl font-bold'>Name:</label>
              <div className='text-2xl'>{data.person.name}</div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='text-2xl font-bold'>Gender:</label>
              <div className='text-2xl'>{data.person.gender}</div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='text-2xl font-bold'>Height:</label>
              <div className='text-2xl'>{data.person.height}</div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='text-2xl font-bold'>Homeworld:</label>
              <a href={data.person.homeworld} target="_blank" rel='noreferrer' className='text-2xl'>View Homeworld</a>
            </div>
          </div>
        </div>
      </div>
    ) : (<div>No data available</div>)}
  </>
}

export default Person