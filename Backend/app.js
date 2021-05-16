const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path=require("path");
const PB = require("./PBschema");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use("/",express.static(path.join(__dirname,"angular")))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,X-Requested-With,Origin,Accept,auth"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,UPDATE,PATCH"
    );
    next();
  });

mongoose
  .connect(
    "mongodb+srv://sahil:HTuU7ciTowPk08cs@cluster0.0hdw3.mongodb.net/PBDB?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected Successfully!");
  })
  .catch((error) => {
    console.log(error);
  });


  app.get("/api/get", (req, res)=>{
      PB.find().then(data=>{
          res.status(200).send(data)
      })
  });


app.post("/api/add", (req, res) => {
  const contact= new PB({
      Name:req.body.Name,
      phnumber:req.body.phnumber
  })
  contact.save().then(()=>{
      res.status(200).json({message:"Contact Saved!"})
  })
});

app.delete("/api/delete/:id",(req,res)=>{
    let id=req.params.id;
    PB.deleteOne({_id:id}).then(()=>{
        res.status(200).json({message:"Deleted boi"})
        console.log("Contact Deleted")
    })
})

app.patch("/api/update/:id",(req,res)=>{
    let id=req.params.id;
    console.log(req.body.Name,req.body.phnumber)
    PB.updateOne({_id:id},{Name:req.body.Name,phnumber:req.body.phnumber}).then(data=>{
        res.status(200).json({message:"updated"})
    })
})

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
})


module.exports = app;
