import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Home(){
    const navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            navigate('/dashboard')
        }else{
            navigate('signin')
        }
    },[])
    
    return(
        <>

        </>
    )
}