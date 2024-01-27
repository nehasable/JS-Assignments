const express=require("express")
const app=express()

const users=[{       //array of objects
name:"Pop",
kidneys:[{
    healthy:"false"
}]
}]
//function for authenticating user and kidney
//here next() is a callback method that passes the processing to the next function is line and it doesnt contain any response
function userMiddleware(req, resp, next) {
    const username = req.query.username;
    const password = req.query.password;

    if (username !== "neha" || password !== "poo") { 
        console.log("Access Denied");
        resp.status(403).json({
            msg: "wrong person!"
        });
    } else {
        console.log("Access Granted");
        next();
    }
}

function kidneyMiddleware(req, resp, next) {
    const kidneyId = req.query.kidneyId;
    
    if (kidneyId != 1 && kidneyId != 2) {
        console.log("Access Denied");
        resp.status(411).json({
            msg: "false!"
        });
    } else {
        console.log("Access Granted");
        next();
    }
}

//-------------------calling user and its kidneys---------------------
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
//--------------------authenticating user and its kidneys(here data is obtained from db)----


app.get('/newhealth',userMiddleware,kidneyMiddleware, function(req,resp){
    resp.send("healthy kidney")
})

app.post('/kidneyinfo',function(req,resp){
    const kidneys=req.body.kidneys
    const kidneyLength=kidneys.length()
    resp.send("you have" +kidneyLength)
})
app.listen(3000)