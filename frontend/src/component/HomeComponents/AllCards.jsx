import React from 'react'
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import { Link } from 'react-router';
import Swal from 'sweetalert2'
import {useMainContext} from '../../context/MainContext'
import { BASE_URL } from '../../constant';
import { AxiosClient } from '../../utils/AxiosClient';
const AllCards = () => {

    const {messages} = useMainContext()
  return (
    <>
                    {
                        messages && messages.length>0 ?messages.map((cur,i)=>{
                            return <Card data={cur} key={i}/>
                        }):<>

                        <div className="flex justify-center items-center ">
                            <h1 className='text-xl font-pbold'>No messages available</h1>
                        </div> </>
                    }     
    </>
  )
}

export default AllCards

const Card = ({data})=>{

  // const id = Date.now()
  const {fetchAllMessage} = useMainContext()

    const deleteHandler = async(id)=>{

          try {
            
      const response = await AxiosClient.delete("/create/message/"+id,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.data 
      await fetchAllMessage()
      
      await  Swal.fire({
            title: 'Success!',
            text: data.title,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          } catch (error) {
            await  Swal.fire({
              title: 'Error!',
              text:  error?.response?.data?.message ||error.message,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          } 
    }


  





    return <>
    <div className=" w-full xl:w-[70%] xl:h-[30vh] mx-auto my-4 flex justify-center  flex-col xl:flex-row items-center xl:items-center  gap-x-10 xl:justify-start rounded-md overflow-hidden shadow-2xs border border-white">
        <div className=" w-full xl:w-1/2">
        <img src={ BASE_URL+"/api/v1/static/" +data.images[0]}className='h-full w-full object-cover shadow-md' alt="" />
        </div>
       <div className="w-full xl:w-auto xl:flex flex-col gap-y-3 xl:justify-center xl:items-center">
       
       <h1 className="text-lg xl:text-xl font-pbold">{data.title}</h1>
       <p>{data.content}</p>
      <div className="flex gap-x-2">
      <button onClick={()=>deleteHandler(data._id)} className="px-5 py-2 bg-pink-800 inline-flex items-center gap-x-2"> <FaRegTrashAlt/> <span>Delete</span></button>
      <Link to={'/message/'+data._id} className="px-5 py-2 bg-pink-800 inline-flex items-center gap-x-2">  <span>View</span> <FaArrowRight/></Link>
      </div>
       </div>
    </div>
    </>
}