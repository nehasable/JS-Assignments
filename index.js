const express=require("express")
const jwt=require('jsonwebtoken')
const jwtPass= "12345"


const app=express()
app.use(express.json())
const allUsers=[{
username:"nehasable45@xyz",
password:"Neha",
name:"Neha"

},
{
    username:"sable45@xyz",
    password:"ha",
    name:"ha"   
}]

app.post("/signin" ,function(req,resp){
    username=req.body.username   //takes username from user in body
    password=req.body.password

const validUser=allUsers.find(user=> user.username === username && user.password ===password)

    if(!validUser){
        return resp.status(403).json({
            msg:"user doesnt exists"
        })
    }


const token=jwt.sign({password:password},jwtPass)
return resp.json({token})
} )
//get verified username back using the token
app.get("/users",function(req,resp){
    const token=req.headers.authorization
    try{
    const verify=jwt.verify(token,jwtPass)
    const username=verify.username
    }
    catch(err){
return resp.status(403).json({
    msg:"invalid"
})
    }
    resp.json({
        user:allUsers
    })
    

})
app.listen(3000,()=>{
        console.log("connected")})