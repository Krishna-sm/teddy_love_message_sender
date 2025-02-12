import { createContext, useContext, useEffect, useState } from "react"
import Loader from "../component/Loader"
import { AxiosClient } from "../utils/AxiosClient"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export const mainContext = createContext({
    user:{
        name:'',
        email:'',
        id:""
    },
    FetchUserProfile:()=>{},
    logoutHandler(){}
})

export const useMainContext = ()=> useContext(mainContext)

export const MainProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    const navigate = useNavigate()

    const logoutHandler= ()=>{
        localStorage.removeItem("token")
        setUser(null)
        navigate("/login")
        toast.success("Logout Success")
    }

      async  function FetchUserProfile(){
                try {
                    const token = localStorage.getItem("token") || ""
                    if(!token) return

                    const response =await AxiosClient.get("/auth/profile",{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const data = await response.data
                    setUser(data);
                    

                } catch (error) {
                    navigate("/login")
                }finally{
                    setLoading(false)
                }
        }

        useEffect(()=>{
            FetchUserProfile()
        },[])

        if(loading){
            return <div className="w-full h-screen flex items-center justify-center">
                <Loader/>
            </div>
        }

    
  return (
    <mainContext.Provider value={{user,FetchUserProfile,logoutHandler}}>
        {children}
    </mainContext.Provider>
  )
} 