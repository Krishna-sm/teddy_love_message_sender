import React from 'react'
import {BrowserRouter,Routes,Route}from 'react-router'
import HomePage from './pages/HomePage'
import Header from './component/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage' 
import { MainProvider } from './context/mainContext'
import MainLayout from '../../backend/src/layouts/MainLayout'
const App = () => {
  return (
    <div className='min-h-screen bg-pink-500'>
      <BrowserRouter> 
        <MainProvider>
      <Header/>
      <div className="w-[98%] mx-auto xl:w-[80%]">
        <Routes>

        <Route path='/' element={<MainLayout />} >  

        <Route index element={<HomePage/>} />
        
        </Route> 
         
          <Route path='/login' element={<LoginPage />} /> 
          <Route path='/register' element={<RegisterPage />} /> 
        </Routes>
      </div> 
      </MainProvider>
      </BrowserRouter>
    </div>
  )
}

export default App