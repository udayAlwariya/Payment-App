const express = require("express")
const accountRouter = require("./accountRouter")
const userRouter = require("./userRouters")
const router = express.Router()

router.use('/user',userRouter)
router.use('/account',accountRouter)

module.exports = router
