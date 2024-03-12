import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export function Dashboard(){
    const navigate = useNavigate()
    const [data,setData] = useState([])
    useEffect(()=>{
        axios({
            method : "get",
            url : "http://localhost:3005/api/v1/user/bulk",
            headers : {
                Authorization :  "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setData(res.data.users)
        })
        .catch((error)=>{
            navigate("/signin")
        })
    },[])
        return(
            <div>
            <Topbar/>
            <SearchUser setData={setData}/>
            <div className="mt-5">
            {data && data.map(user=><Users user={user}/> )}
            </div>
            
            </div>
        )
    }
    

function Topbar(){
    const navigate = useNavigate()
    const [user,setUser] = useState({name:"User"})
    function clickHandler(){
        localStorage.removeItem("token")
        navigate("/signin")
    }
    useEffect(()=>{
        axios({
            method : "get",
            url : "http://localhost:3005/api/v1/account/balance",
            headers : {
                Authorization :  "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
    },[])
    return(
        <>
         < div className="static items-center">
        <div className="flex justify-between w-9/12 shadow-md mt-5 mx-auto py-5 px-2 ">
            <h1 className="text-2xl font-sans font-bold">Payments App</h1>
            <div className="flex px-3 items-center">
            <p className="font-semibold">Hello, {user.name}</p>
            <button className="bg-gray-200 rounded-full px-3 py-1 font-semibold ml-2">{user.name[0].toUpperCase()}</button>
            </div>
        </div>
        <div>
        <button className="absolute hover:bg-slate-400 top-28 right-0 bg-gray-200 lg:max-xl:right-3 lg:max-xl:top-10 md:max-lg:right-0 md:max-lg:top-10 rounded-md xl:top-10  xl:right-5 px-3 py-1  text-[16px] font-semibold" onClick={clickHandler}>Sign Out</button>
        </div>
        </div>
        <Balance user={user}/>
        </>
       
    )
}

function Balance({user}){
    return(
        <>
        <h1 className="text-xl font-sans w-9/12 mt-5 font-bold mx-auto">Your Balance Rs {user.balance} </h1>
        </>
    )
}

function SearchUser({setData}){

    const [filter,setFilter] = useState("")
    console.log(filter)
    useEffect(()=>{
        axios({
            method : "get",
            url : "http://localhost:3005/api/v1/user/bulk?filter=" + filter,
            headers : {
                Authorization :  "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setData(res.data.users)
        })
    },[filter])
    return(
        <div className="w-9/12 mx-auto">
        <h1 className="text-xl font-sans w-9/12 mt-5 font-bold">Users</h1>
        <input className="border w-full rounded-md py-2 mt-4 mx-auto px-2" onChange={(e)=>setFilter(e.target.value)} type="text" placeholder="Search Users....." />
        </div>
    )
}  
function Users({user}){
    const navigate = useNavigate()
    return(
        <div className="flex justify-between w-9/12 mx-auto py-2 px-2 ">
            <div className="flex px-3 items-center">
            <button className="bg-gray-200 rounded-full px-3 py-1 font-semibold ml-2">{user.firstName[0].toUpperCase()}</button>
            <p className="font-semibold text-[18px] ml-2">{user.firstName} {user.lastName}</p>
            </div>
            <button onClick={()=>navigate(`/send?id=${user._id}&name=${user.firstName}`)} className="hover:bg-stone-700 text-[15px] px-3 py-2 bg-black rounded-md text-white">Send Money</button>
            
        </div>
    )
}