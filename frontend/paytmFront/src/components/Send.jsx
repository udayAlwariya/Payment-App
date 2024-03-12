import axios from "axios"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
export function Send(){
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount,setAmount] = useState("")
    function clickHandler(){
        axios({
            method : "post",
            url : "http://localhost:3005/api/v1/account/transfer",
            headers : {
                Authorization :  "Bearer " + localStorage.getItem("token")
            },
            data : {
                to : id,
                amount : amount 
            }
        }).then( (res)=>{
            console.log(res.data)
            toast.success("Payment Successful")
            navigate("/dashboard")
        })
        .catch((error)=>{
            toast.error("Insufficient Balance or amount is null")
        })
    }
    return(
        <div className="w-3/12 shadow-lg py-10 mt-[140px] mx-auto">
        <h1 className="text-center font-bold text-2xl mb-10">Send Money</h1>
        <div className="flex px-3 items-center">
            <button className="text-white rounded-full bg-green-400 px-4 py-2 font-semibold text-[18px] ml-2">{name[0].toUpperCase()}</button>
            <p className="font-semibold text-[18px] ml-2">{name}</p>
        </div>
        <p className="font-semibold text-[15px] ml-5 mt-2">Amount (in Rs)</p>
        <input className="ml-5 border rounded-md w-10/12 mt-2 pl-2 py-2" onChange={(e)=>setAmount(e.target.value)} type="number" placeholder="Enter amount" />
        <button onClick={clickHandler} className="w-10/12 bg-green-400 ml-5 mt-2 py-2 rounded-md text-white">Initiate Transfer</button>
        </div>
    )
}