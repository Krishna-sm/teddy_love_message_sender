import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
const AllCards = () => {
  return (
    <>
                    {
                        Array(5).fill(null).map((cur,i)=>{
                            return <Card key={i}/>
                        })
                    }     
    </>
  )
}

export default AllCards

const Card = ()=>{

    const deleteHandler = async()=>{
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }

    return <>
    <div className="w-[70%] h-[30vh] mx-auto my-4 flex items-start gap-x-10 justify-between rounded-md overflow-hidden shadow-2xs">
        <div className="w-1/3">
        <img src="https://i.pinimg.com/originals/23/bf/a7/23bfa774eb503426d3278247aa6aaae3.jpg"className='h-full w-full object-cover shadow-md' alt="" />
        </div>
       <div className="w-full">
       
       <h1 className="text-xl font-pbold">Hi There How Are you</h1>
       <p>how i connect you </p>
       <button onClick={deleteHandler} className="px-5 py-2 bg-pink-800 inline-flex items-center gap-x-2"> <FaRegTrashAlt/> <span>Delete</span></button>
       </div>
    </div>
    </>
}