require("dotenv").config()
const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({
            msg : "Token not found"
        })
    }
    let token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        req.userID = decoded.userID
        // console.log(decoded)
        next()
    }catch(e){
        return res.status(404).json({
            msg : "Something went wrong"
        })
    }
}

module.exports = {auth}