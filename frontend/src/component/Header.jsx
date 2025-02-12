import React from 'react'
import {Link} from 'react-router'
import { RiBearSmileFill } from "react-icons/ri";
import { useMainContext } from '../context/mainContext';

const Header = () => {
  const {user,logoutHandler} = useMainContext()
  return (
    <header className='w-full py-3 px-2 border-b'>
        <nav className='w-[98%] mx-auto xl:w-[80%] flex items-center justify-between'>
            <Link to={'/'} className='font-pbold inline-flex items-center gap-x-2'><RiBearSmileFill className='text-4xl'/> TeddyLove</Link>
            <ul className="flex items-center gap-x-2">
            {!user && user?.email!='' ?   <>
               <li><Link to={'/login'}>Login</Link></li>
               <li><Link to={'/register'}>Register</Link></li> 
               </>:
              <>
              <li>Create</li>
              <li>
                <button onClick={logoutHandler} className=' px-3 cursor-pointer xl:px-6 py-2 rounded-sm border border-white hover:bg-pink-900 transition-all duration-300'>Logout</button>
              </li>
              </>}
            </ul>
        </nav>
    </header>
  )
}

export default Header