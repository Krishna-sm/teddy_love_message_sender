import React, { useEffect, useState } from 'react'
import Slider from './Slider'
import { FaEye } from 'react-icons/fa'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ImCancelCircle } from "react-icons/im";
import Loader from '../../component/Loader';
import {useParams} from 'react-router'
import {toast} from'react-toastify'
import { AxiosClient } from '../../utils/AxiosClient';
const ShowTeaddy = () => {
    let [isOpen, setIsOpen] = useState(false)
    const [loading,setLoading] = useState(true)
    const [teaddy, setTeaddy] = useState(null)
    const params = useParams()

    const fetchMessage=async()=>{
      try {
        
        const response = await AxiosClient.get("/create/get-message/"+params.id);
        const data = await response.data;
        console.log(data);
        setTeaddy(data)
      } catch (error) {
          toast.error( error.response.data.message ||error.message)
      }finally{
        setLoading(false)
      }
    }

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }

    useEffect(()=>{
      if(params && params.id){
        fetchMessage()
      }
    },[params])

    if(loading){
      return <div className='min-h-screen w-full flex items-center justify-center'>
        <Loader/>
      </div>
    }



  return (
    <> 
               <div className="pt-10 pb-4">
               <h1 className ="  text-4xl xl:text-6xl 2xl:text-7xl text-center font-love ">:- {teaddy.message.title} :- </h1>
               </div>
               <div className="bg-pink-900 mx-auto py-4 text-center rounded-md   w-full xl:w-[70%]">
                                <p className='px-4'>{teaddy.quote.quote}</p>
                        </div>
              <div className="flex items-center py-4 justify-center">
            <Slider images={teaddy.message.images} />
              </div>

              <div className='flex items-center justify-center'>
                 <button  onClick={open} className="px-5 py-2 bg-pink-800 inline-flex items-center gap-x-2"> <FaEye/> <span>Don't Click</span></button>
           
              </div>

              <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[80%]  rounded-xl bg-pink-700 p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="div" className="text-base/7 font-medium text-white flex items-center justify-between">
             <h1 className='text-center w-full font-love text-4xl'>   For You 😍 </h1>
             <button onClick={close} className='text-white text-4xl cursor-pointer'>
                <ImCancelCircle  />
             </button>
              </DialogTitle>
              <div className="min-h-[50vh] flex items-center justify-center ">

              <p className="mt-2   text-white text-center text-4xl font-black">
            {teaddy.message.content}
              </p>
              </div>
          
            </DialogPanel>
          </div>
        </div>
      </Dialog>
                        
    </>
  )
}

export default ShowTeaddy