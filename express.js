const express=require("express")
const app=express()

const users=[{       //array of objects
name:"Pop",
kidneys:[{
    healthy:"false"
}]
}]

app.get("/",function(req,resp ){
    //we want to know whether the first user's kidney is healthy or no
const userKidneys=users[0].kidneys
//we also need to iterate over array and find out number of healthy kidneys
const numOfKidneys=userKidneys.length
// let numOfHealthyKidneys=0
// for(i=0;i<userKidneys.length;i++)  //count no of kidneys as you go
// if(userKidneys[i.healthy]){
//     numOfHealthyKidneys=numOfKidneys+1
// }
const numOfHealthyKidneys=userKidneys.filter(function(kidney){
    return kidney.healthy==true
})


resp.json({
    
    numOfHealthyKidneys:numOfHealthyKidneys.length
})
})

app.get('/kidney',function(req,resp){
    const kidneyId=req.query.kidneyId
    const username=req.headers.username
    const password=req.headers.password

   if (username!="neha" || password!="poo") {     //or because either one of those have to be wrong to invoke error
    resp.status(403).json({
        msg:"wrong person!"
    })
    return;
   }

   if (kidneyId !=1 && kidneyId !=2) {       //and because both 1 and 2 are valid ans
    resp.status(411).json({
        msg:"false!"
    })
    return;
   }
   
   resp.send("healthy kidney")
})

app.listen(3000)