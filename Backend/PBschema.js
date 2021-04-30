const mongoose=require("mongoose")

const PBschema=new mongoose.Schema({
    Name:String,
    phnumber:Number
})


module.exports=mongoose.model("Phonebook",PBschema)