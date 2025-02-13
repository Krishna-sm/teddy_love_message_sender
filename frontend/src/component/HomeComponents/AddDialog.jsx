 
import { CiCirclePlus } from "react-icons/ci";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from 'yup'
import UploadTeaddy from "./UploadTeaddy";
import { FaArrowRight } from "react-icons/fa";
import {CgSpinner} from 'react-icons/cg'
import {toast} from 'react-toastify'
import { AxiosClient } from "../../utils/AxiosClient";
import { useMainContext } from "../../context/MainContext";
const AddDialog = () => {
    let [isOpen, setIsOpen] = useState(false)
    const [loading,setLoading] = useState(false)
      const {fetchAllMessage} = useMainContext()

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const initialValues= {
    title:'',
    message:'',
    images:[]
  }

  const validationSchema = yup.object({
    title: yup.string().required('Title is Required'),
    message: yup.string().required('Message is Required'),
    images: yup.array().of(yup.mixed()).required('Images is Required'),
  })
  const onSubmitHandler = async(values,helpers)=>{
        try {

          const formData = new FormData()
            formData.append("title",values.title)
            formData.append("message",values.message)
          

            values.images.forEach((cur,i)=>{
              formData.append('images', cur)
            })
            const response = await AxiosClient.post("/create/message",formData,{
              headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })

            const data = await response.data; 
            await fetchAllMessage()
            



          // values.images.forEach((image, index) => {
          //   formData.append('images', image, image.name)
          // })


          // api request

          //message
          toast.success(data.message)
          helpers.resetForm()
          close()



        } catch (error) {
            toast.error( error.response.data.message ||error.message)
        }
    
  }


  return (
    <>
            <h1 className='inline-flex items-center justify-center gap-x-3'><button  onClick={open} className=''><CiCirclePlus className='text-5xl'/></button> <span>To Add New Teaddy</span></h1>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[80%] rounded-xl bg-pink-800  text-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="div" className="text-base/7 font-medium  flex items-center py-3 justify-center border-b">
                <h3 className="w-full text-center font-pbold text-3xl">Create A Teaddy</h3>
                <button  onClick={close} className="text-4xl text-white">
                  <ImCancelCircle />
                </button>
              </DialogTitle>
          <div className="min-h-[50vh]">


              <Formik  validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler} >
                {({values,setFieldValue,handleSubmit})=>(
                      <form onSubmit={handleSubmit} className="py-4">
                              <div className="mb-3">
                                <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
                                <Field name="title" id="title" type="text" className="mt-1   block w-full border-white rounded-md border outline-none p-2" placeholder="Enter Title" />
                                <ErrorMessage className="text-sm text-red-500 font-pregular"  component={'p'} name="title" />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                                <Field as="textarea" name="message" id="message" type="text" className="mt-1   block w-full border-white rounded-md border outline-none p-2" placeholder="Enter Message" />
                                <ErrorMessage className="text-sm text-red-500 font-pregular"  component={'p'} name="message" />

                              </div>
                              <div className="mb-3">
                                <UploadTeaddy setMethod={setFieldValue} />
                                <ErrorMessage className="text-sm text-red-500 font-pregular"  component={'p'} name="images" />

                              </div>
                              <div className="mb-3">
                                <button type="submit" disabled={loading} className="py-3 flex items-center justify-center w-full bg-pink-700 disabled:bg-pink-900 gap-x-2 disabled:cursor-no-drop cursor-pointer font-pregular ">
                                <span>Add</span>
                             {loading? <CgSpinner className="animate-spin" />:   <FaArrowRight/> }
                                </button>
                              </div>

                      </form>
                )}
                </Formik>      

          </div>


              
            </DialogPanel>
          </div>
        </div>
      </Dialog>

            
    </>
  )
}

export default AddDialog