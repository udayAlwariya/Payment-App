const express = require("express")
const { auth } = require("../middlewares/auth")
const {balance, transfer} = require("../controllers/accountController")
const router = express.Router()

// router.post('/transfer',)
router.get('/balance',auth,balance)
router.post('/transfer',auth,transfer)

module.exports = router