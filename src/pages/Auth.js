import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'


// authenticate mutation
const AUTHENTICATE = gql`
    mutation Authenticate($username: String!){
        authenticate(username: $username) {
            accessToken,
            tokenType
        }
    }
`

const Auth = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")

    //  function to listen for username change
    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    const [authenticate, { data, loading, errors }] = useMutation(AUTHENTICATE)

    // function to handle login operations
    const handleSubmit = (event) => {
        event.preventDefault()
        
        authenticate({ variables: { username: username } }).then((res) => {
            if (!loading) {
                // access the data & store token in localStorage

                localStorage.setItem("user-token", `${res.data.authenticate.accessToken}`)
                localStorage.setItem("username", username)
                localStorage.setItem("loggedIn", true)

                navigate("/", { replace: true });
            }
        })



    }


    return (
        <div className='flex h-screen justify-center items-center'>
            <div className='w-11/12 sm:w-3/12 mx-auto p-4 drop--shadow'>

                {errors && (
                    <div id="alert-2" className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        { errors }
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                )}

                <h2 className='my-4 text-3xl font-bold'>Welcome to <span className='text-blue-900'>People</span></h2>
                <p>Please provide your username to continue.</p>

                <div className='mt-8 space-y-4'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Minisa" required value={username}
                        onChange={handleChange}></input>
                </div>

                <button type="submit" className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>
                    {loading ? <div className='flex justify-center items-center'>
                        <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div> : <>Submit</>}
                </button>
            </div>

            {/* { loading ? "Loading Data" : "FInished loading"}
            { data ? data.authenticate.accessToken : "Nothing to show"}
            { error ? error : "no error" } */}
        </div>
    )
}

export default Auth