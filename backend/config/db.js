const mongoose  = require('mongoose')
require("dotenv").config()
const connect = async () =>{

await mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.error(e)
})
}

module.exports = {connect}