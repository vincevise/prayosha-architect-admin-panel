import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='w-full py-4 px-6 bg-blue-400 fixed z-10 text-white font-semibold text-lg shadow-md flex items-center  justify-between'>
       <span>Content Management App</span>
       <span className=' flex gap-3 font-normal '>
            <Link to={'/'} className='text-lg'>Home</Link>
            <Link to={'/projects'} className='text-lg'>Projects</Link>
        </span> 
    
    </div>
  )
}

export default NavBar