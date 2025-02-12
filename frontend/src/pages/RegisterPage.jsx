import React, { useState } from 'react'
import {Formik,Form,ErrorMessage,Field} from 'formik'
import{FaEye} from 'react-icons/fa'
import { IoEyeOffSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";

import {Link} from 'react-router'

import * as yup from 'yup'
import { toast } from 'react-toastify';
import { AxiosClient } from '../utils/AxiosClient';
const RegisterPage = () => {

  const [isHide,setIsHide] = useState(true)
  const [loading,setLoading] = useState(false)

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    email: yup.string().email('Invalid Email').required('Email is Required'),
    password: yup.string().required('Password is Required').min(6, 'Password must be at least 6 characters long'), 
  })

  const onSubmitHandler = async(e,helpers)=>{
    try {
      setLoading(true)
      const response = await AxiosClient.post("/auth/register",e)
      const data = await response.data;
      console.log(data);
      toast.success(data.msg)
      helpers.resetForm()
      
    } catch (error) {
          toast.error(error.response.data.message || error.message)
    }finally{
      setLoading(false)
    }
  }
  const initalValues= {
    name: '',
    email: '',
    password: '',
  }


  return (
    <>
           <div className="flex items-center w-full justify-center min-h-[70vh]">
           <div className=" w-[96%] xl:w-[80%] bg-white  overflow-hidden rounded-md min-h-[60vh] shadow-2xl shadow-pink-700 flex ">
            <div className="hidden xl:block w-1/2">
                <img src="https://needybucket.in/cdn/shop/files/2268B99C-6406-48D7-86B5-DD55EC48C42B.png?v=1729776590" className='w-full h-full object-cover' alt="" />
            </div>
            <Formik validationSchema={validationSchema} onSubmit={onSubmitHandler} initialValues={initalValues}>
            <Form className=" w-full xl:w-1/2  px-2 xl:px-10 py-10 text-black">
            <div className="mb-3">
                            <div className="mx-auto w-[100px] h-[100px] overflow-hidden rounded-full p-2  border-2  border-pink-500 transition-all duration-300 cursor-pointer ">
                            <img src="https://cdn-icons-png.freepik.com/512/8758/8758506.png" alt="" className='hover:scale-110 transition-all duration-300' />
                            </div>
            </div>
                                <div className="mb-3">
                                            <Field type="text" className='w-full py-2 px-4 border outline-none border-pink-400 text-sm rounded-md' placeholder='Enter Your Name' name="name" />
                                            <ErrorMessage className='text-xs text-red-500' name='name' component={'p'} />
                                    </div>  
                                    <div className="mb-3">
                                            <Field type="text" className='w-full py-2 px-4 border outline-none border-pink-400 text-sm rounded-md' placeholder='Enter Your Email Address' name="email" />
                                            <ErrorMessage className='text-xs text-red-500' name='email' component={'p'} />
                                    </div>    
                                    <div className="mb-3">
                                          <div className="flex border-pink-400 border items-center gap-x-2 px-3">
                                          <Field type={isHide?"password":"text"} className='w-full py-2   outline-none  text-sm rounded-md' placeholder='Enter Your Password' name="password" />
                                          <button type='button' onClick={()=>setIsHide(!isHide)} className='outline-none cursor-pointer'>
                                          {isHide ?<FaEye className='text-pink-800' />:
                                          <IoEyeOffSharp className='text-pink-800'/>}
                                          </button>
                                          </div>
                                            <ErrorMessage className='text-xs text-red-500' name='password' component={'p'} />
                                    </div>  
                                    <div className="mb-3">
                                              <button disabled={loading} className={
                                                `
                                                w-full py-2 flex items-center justify-center bg-pink-600 gap-x-2 text-white disabled:bg-pink-800 cursor-pointer
                                                `
                                              }>Register {!loading ?<FaArrowRight/>:
                                              <ImSpinner8 className='animate-spin' />} </button>
                                      </div>   
                                      <div className="mb-3">
                                                 <p className="text-end text-sm text-black">
                                                  Already Have An Account ? <span>
                                                  <Link to={'/login'} className='text-pink-600'>Login</Link>
                                                  </span>
                                                 </p>
                                        </div>            
            </Form>
            </Formik>

           </div>
           </div>
    </>
  )
}

export default RegisterPage