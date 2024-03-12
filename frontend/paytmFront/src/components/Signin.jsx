import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export function Signin(){

    const navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("token")
        
            axios({
                method : "get",
                url : "http://localhost:3005/api/v1/user/checkAuth",
                headers : {
                    Authorization : "Bearer "+ token
                }
            })
            .then((res)=>{
                console.log("HEY")
                console.log(res)
                navigate('/dashboard')
            })
            .catch((e)=>{
                console.log(e)
                navigate('/signin')
            })
        
    },[])
    const [formData,setFormData] = useState({
        username : "",
        password : ""
    })
    function clickHandler(){
        axios({
            method : "post",
            url : "http://localhost:3005/api/v1/user/Signin",
            data : formData
        })
        .then((response)=>{
            let token = response.data.token
            localStorage.setItem("token",token)
            toast.success("Welcome Back",{
                autoClose : 2000
            })
            navigate("/dashboard")
            
        })
        .catch((error)=>{
            toast.error("Wrong Credentials",{
                autoClose : 2000
            })
            console.log(error)
        })
    }
    console.log(formData)
    function changeHandler(e){  
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    return(
        <div className="mt-20 mx-auto py-3 shadow-lg w-3/12 rounded-md">
        <div className="mt-5 text-center mb-6">
            <h1 className="font-bold text-3xl">Sign In</h1>
            <p className="text-gray-500 w-2/3 mx-auto mt-3">Enter your credentials to access your account</p>
        </div>

        <div className="mx-auto w-10/12">
    
        <div className="mb-2">
            <p className="font-bold mb-2">Email</p>
            <input className="border rounded-md  w-full py-1 pl-2" value={formData.username} onChange={changeHandler} name="username" type="text" placeholder="JohnDoe@gmail.com"/>
        </div>
        <div className="mb-4">
            <p className="font-bold">Password</p>
            <input className="border rounded-md  w-full py-1 pl-2" value={formData.password} onChange={changeHandler} name="password" type="password" />
        </div>
        <div>
        <button onClick={clickHandler} className="border mb-3 text-white bg-black rounded-md  w-full py-1 pl-2">Signin</button>
        <p className="text-center mb-8">Dont have an account ? <Link to="/signup"><u>Signup</u></Link></p>
        </div>
        
        </div>
    
    </div>
    )
}