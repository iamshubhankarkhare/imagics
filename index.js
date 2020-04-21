const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')




const app = express();
//for ejs
app.set('view engine', 'ejs');
//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(express.static('./views'));
//routes
app.get('/', (req, res) => {
    res.render('home')
})

//for uploading through multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
//route to upload 
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('home', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('home', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                console.log("upload to hiu h");
                res.render('home', {

                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

//listening here
var port = process.env.port || 3000;

app.listen(port, (err) => {
    if (err)
        console.error();
    else
        console.log(`running on ${port}`);
});