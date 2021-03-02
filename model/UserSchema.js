const mongoose = require("mongoose")
const col_name  = "users"
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    phone:Number,
    email:String,
    password:String,
    rePassword:String
})

// 
mongoose.model(col_name, userSchema);
module.exports = mongoose.model(col_name)

