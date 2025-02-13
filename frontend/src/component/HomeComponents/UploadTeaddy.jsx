import React, { useState ,useCallback} from 'react'
import { ImCancelCircle } from "react-icons/im"; 
import {useDropzone} from 'react-dropzone'
const UploadTeaddy = ({setMethod}) => {

    const [images,setImages] = useState([])

    const removeImge= (index)=>{
        const new_images = images.filter((_,ind)=> ind!==index)
        setImages(new_images)
        setMethod("images",new_images)
    }


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setImages(acceptedFiles)
        setMethod("images",acceptedFiles)
        
        
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
        maxFiles: 12,

      })

  return (

   <>
       { images.length<=0?  <div {...getRootProps()}
        className='w-full border-dashed border-2  py-10 text-center rounded-md hover:bg-pink-900 transition-all duration-300 cursor-pointer'
       >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>:

    <div className="grid grid-cols-4 xl:grid-cols-6 gap-x-2 gap-y-2">
                    {
                        images.map((cur,i)=>{
                            return <Teddy imagePath={cur} removeImge={()=>removeImge(i)} key={i} />
                    })
                    }
    </div>}
   </>

  )
}

export default UploadTeaddy


const Teddy = ({imagePath,removeImge})=>{
    return <>
       <div className="relative">
       <img src={URL.createObjectURL(imagePath)} alt="" />
       <button type='button'  onClick={removeImge} className='absolute top-[-10px] right-[-10px] bg-pink-900 text-xl p-2 rounded-full'>
        <ImCancelCircle/>
       </button>

       </div>
    </>
}