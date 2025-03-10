
const mongoose = require("mongoose")
require('dotenv').config();
const connectDB =async ()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("db connection");

    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports = connectDB;




