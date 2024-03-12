import { useState,useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
export function Signup(){
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
                navigate('/dashboard')
            })
            .catch((e)=>{
                console.log(e)
                navigate('/signup')
            })
        
    },[])
    const [formData,setFormData] = useState({
        firstName : "",
        lastName : "",
        username : "",
        password : ""
    })
    function changeHandler(e){
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    function clickHandler(){
        axios({
            method : "post",
            url : "http://localhost:3005/api/v1/user/Signup",
            data : formData
        }).then((res)=>{
            navigate("/dashboard")
            setFormData({
                firstName : "",
                lastName : "",
                username : "",
                password : ""
            })
            console.log(res.data)
            let token = res.data.token
            localStorage.setItem("token",token)
        }).catch((error)=>{
            toast.error('Signup Failed!',{
                autoClose : 2000
            })
        })
    }
    return(
        <div className="mt-20 mx-auto border-2 shadow-md border-white-500 w-3/12 rounded-md">
            <div className="mt-5 text-center mb-6">
                <h1 className="font-bold text-3xl">Sign Up</h1>
                <p className="text-gray-500 w-2/3 mx-auto mt-3">Enter your information to create an account</p>
            </div>

            <div className="mx-auto w-10/12">
            <div className="mb-2">
                <p className="font-bold mb-2">First Name</p>
                <input className="border rounded-md  w-full py-1 pl-2" value={formData.firstName} onChange={changeHandler} name="firstName" type="text" placeholder="John"/>
            </div>
            <div className="mb-2">
                <p className="font-bold mb-2">Last Name</p>
                <input className="border rounded-md w-full py-1 pl-2" value={formData.lastName} onChange={changeHandler} name="lastName" type="text" placeholder="Doe"/>
            </div>
            <div className="mb-2">
                <p className="font-bold mb-2">Email</p>
                <input className="border rounded-md  w-full py-1 pl-2" value={formData.username} onChange={changeHandler} name="username" type="text" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div className="mb-4">
                <p className="font-bold">Password</p>
                <input className="border rounded-md  w-full py-1 pl-2" value={formData.password} onChange={changeHandler} name="password" type="password" />
            </div>
            <div>
            <button onClick={clickHandler} className="border mb-3 text-white bg-black rounded-md  w-full py-1 pl-2">Signup</button>
            <p className="text-center mb-6">Already have an account ? <Link to="/signin"><u>Signin</u></Link></p>
            </div>
            
            </div>
        
        </div>
    )
}