const express=require ('express')


const app=express();

app.get('/',(req,res)=>{
    res.send("");
})

var port = process.env.port || 3000;

app.listen(port,(err)=>{
    if(err)
    console.error();
    else
    console.log(`running on ${port}` );
});