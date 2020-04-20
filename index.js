const express=require ('express');
const ejs=require ('ejs');
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')




const app=express();
//for ejs
app.set('view engine', 'ejs');
//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
//routes
app.get('/',(req,res)=>{
    res.render('home')
})

//for uploading through multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })
  app.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log("badhiya")
    res.send("yess boy")
  })

//listening here
var port = process.env.port || 3000;

app.listen(port,(err)=>{
    if(err)
    console.error();
    else
    console.log(`running on ${port}` );
});