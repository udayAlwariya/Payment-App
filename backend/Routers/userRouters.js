const express = require("express")
const { signup, signin, update, bulk, checkAuth } = require("../controllers/userControllers")
const {auth} = require("../middlewares/auth")
const router = express.Router()

router.post('/Signup',signup)
router.post('/Signin',signin)
router.put('/update',auth,update)
router.get('/bulk',auth,bulk)
router.get('/checkAuth',checkAuth)
// router.put('sendMoney')
module.exports = router