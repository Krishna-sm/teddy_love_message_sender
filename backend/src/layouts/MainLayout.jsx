import React from 'react'
import {Outlet,Navigate} from 'react-router'
import { useMainContext } from '../../../frontend/src/context/mainContext'
import {toast} from 'react-toastify'
import { useState } from 'react'
import Loader from '../../../frontend/src/component/Loader'
import { useEffect } from 'react'

const MainLayout = () => {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)

    const {user} = useMainContext()
    
    useEffect(()=>{
        if(!user ||  user?.email ===""){ 
            setError(true)
        }else{ 
            
            setLoading(false)
        }
    },[])
    if(error){
        return <Navigate to="/login" />
    }

    if(loading){
        return <div className="min-h-screen w-full flex items-center justify-center">
            <Loader/>
        </div>
    }

  return (
    <>
            <Outlet/>
    </>
  )
}

export default MainLayout