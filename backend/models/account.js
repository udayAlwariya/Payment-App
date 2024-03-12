const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "userCollection",
    required : true
    },
    balance : {
        type : Number,
        required : true
    }

})

const accountModel = mongoose.model("accountCollection",accountSchema)

module.exports = accountModel