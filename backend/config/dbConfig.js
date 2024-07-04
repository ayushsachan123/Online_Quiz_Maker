const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ayushsachanin:Ayush703a@cluster0.0fcuzwk.mongodb.net/test")

const connectionDb = mongoose.connection

connectionDb.on('error',(error)=>{
    console.log(error);
})

connectionDb.on('connected',()=>{
    console.log("Connected to Database successfully.")
})

module.exports = connectionDb
