var express=require("express");

var bcrypt = require('bcrypt'); 
var app=express();
var fs=require("fs");


app.use(express.json())
// app.use(express.urlencoded({extended:true}));


app.post("/product",async(req,res)=>{

    console.log(req.body);

    var salt=10;

    var passwordhashed=await bcrypt.hash(req.body.hello,salt);

    fs.writeFile("./index.txt",passwordhashed,"utf-8",(err)=>{


        if(err){
            res.status(400).send(err.message);
        }else{
            res.status(200).send({password:passwordhashed});
        }

    })


 

})

app.get("/",(req,res)=>{

    res.send("hello world")

})


app.post("/data",async(req,res)=>{

    console.log(req.body);

    var h=fs.readFileSync("./index.txt","utf-8");

   
    

    var i=await bcrypt.compare(req.body.n,h);

    res.send(i)


})

var port=3002;

app.listen(port,()=>{

  

    console.log("server has been started");
    
})



