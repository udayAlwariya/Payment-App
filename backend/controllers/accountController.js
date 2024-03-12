const accountModel = require("../models/account")
const { userModel } = require("../models/users")

const balance = async (req,res)=>{
    const userId = req.userID
    console.log(userId)
    let userBankAccount = await accountModel.findOne({userId : userId})
    let userInfo = await userModel.findOne({_id : userId})
    res.json({
        balance : userBankAccount.balance,
        name : userInfo.firstName

    })
}
const transfer = async(req,res)=>{
    const {to,amount} = req.body
    const senderAccount = await accountModel.findOne({
        userId : req.userID
    })
    console.log(senderAccount)
    if(amount== "" || amount == 0 ){
        return res.status(400).json({
            msg : "Please put some amount"
        })
    }
    if(senderAccount.balance<amount){
        return res.status(400).json({
            msg : "Insufficient balance"
        })
    }
    let receiverAccount = await accountModel.findOne({
        userId : to
    })
    if(!receiverAccount){
        return res.json({
            msg : "Invalid account"
        })
    }
    await accountModel.updateOne({userId : req.userID},{
        $inc : {
            balance : -amount
        }
    })
    await accountModel.updateOne({userId : to},{
        $inc : {
            balance : amount
        }
    })
    res.json({
        msg : "Transaction passed"
    })



}


module.exports = {balance,transfer}