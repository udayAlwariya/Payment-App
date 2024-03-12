const express = require("express")
const cors = require('cors')
require("dotenv").config()
const router = require("./Routers/router")
const app = express()
app.use(express.json())

require("./config/db").connect()
app.use(cors())

app.use('/api/v1/',router)

app.listen(process.env.PORT || 3000,()=>{
    console.log(process.env.PORT)
})