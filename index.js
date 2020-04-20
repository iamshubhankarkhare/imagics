const express=require ('express');
const ejs=require ('ejs');


const app=express();
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('home')
})

var port = process.env.port || 3000;

app.listen(port,(err)=>{
    if(err)
    console.error();
    else
    console.log(`running on ${port}` );
});