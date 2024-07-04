const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

const connectionDb = mongoose.connection

connectionDb.on('error',(error)=>{
    console.log(error);
})

connectionDb.on('connected',()=>{
    console.log("Connected to Database successfully.")
})

module.exports = connectionDb
