//reusable middleware component

const express=require('express')
const app=express()

//middle ware fn to only allow above 14
function old(age){
    if(age>=14){
        return true
    }
    else{
        return false
    }

}
app.get('./ride1',function(req,resp){
if (old(req.query.age)){
    resp.json({
       msg: "qualify"})
}else{
    resp.status(411).json({msg:"not qualified"})
}
    
})
app.listen(3000 )