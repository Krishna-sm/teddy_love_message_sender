import React from 'react'
import AddDialog from '../component/HomeComponents/AddDialog'
import AllCards from '../component/HomeComponents/AllCards'

const HomePage = () => {
  return (
    <>
         <div className="py-10">
         <AddDialog/>
         <AllCards/>
         </div>
    </>
  )
}

export default HomePage