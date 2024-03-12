
require("dotenv").config()
const jwt = require('jsonwebtoken')
const {zodSignUpSchema,zodSigninSchema,zodUpdateSchema} = require("../config/zod")
const { userModel } = require("../models/users")
const accountModel = require("../models/account")

const signup = async (req,res) => {
    const {username,password,firstName,lastName} = req.body
    let response = zodSignUpSchema.safeParse({
        username : username,
        password : password,
        firstName : firstName,
        lastName : lastName
    })
    console.log(response)
    if(response.success == true){
        let userExist = await userModel.findOne({username:username})
        if(userExist){
            return res.status(411).json({
                msg : "User already exists"
            })
        }
        const user = await userModel.create({
            username,
            password,
            firstName,
            lastName
        })
        const userId = user._id
        await accountModel.create({
            userId : userId,
            balance : Math.floor(Math.random() * 10000)

        })
        const payload = {
            userID : user._id
        }
        const token = jwt.sign(payload,process.env.JWT_KEY)
        res.status(200).json({
            msg : "User created successfully",
            token : token
        })
    }else{
        res.status(411).json({
            msg : "Check your Inputs"
        })
    }
    
}

const signin = async (req,res) =>{
    const {username,password} = req.body
    let response = zodSigninSchema.safeParse({
        username : username,
        password : password
    })
    if(response.success == true){
        let user = await userModel.findOne({username,password})
        if(!user){
            return res.status(404).json({
                msg : "Please signup first"
            })
        }
        const payload = {
            userID : user._id
        }
        const token = jwt.sign(payload,process.env.JWT_KEY)
            res.json({
                token : token
            })
        
        
    }else{
        res.status(404).json({
            msg : "Check your inputs properly"
        })
    }
    
}

const update = async(req,res) =>{
    let body = req.body
    let response = zodUpdateSchema.safeParse(body)
    console.log("Heyy")
    if(response.success == false){
        return res.json({
            msg : "Check your inputs please"
        })
    }
    await userModel.updateOne({_id : req.userID},body)
    res.json({
        msg : "user updated successfully"
    })

}

const bulk = async (req,res) =>{
    const filter = req.query.filter || ""
    console.log(filter)
    const users = await userModel.find({
        "$or" : [{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }]
    })
    const newUsers = users.filter(user=>user._id!=req.userID)
    res.json({
        users : newUsers.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}

const checkAuth = (req,res) =>{
    let authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(404).json({
            msg : "Token not Found"
        })
    }
    let token = authHeader.split(" ")[1]
    try{
        let decoded = jwt.verify(token,process.env.JWT_KEY)
        return res.json({
            msg : "Success"
        })
    }
    catch(e){
        return res.status(404).json({
            msg : "Invalid Token"
        })
    }
}
module.exports = {signup,signin,update,bulk,checkAuth}