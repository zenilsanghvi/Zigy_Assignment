const express = require('express');
const multer = require('multer');
const path = require('path');
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+ '.mp4');
    },
});
const upload = multer({
    storage:storage
  });
  
app.set('views', path.resolve("./views"));

app.use(express.json());

let uploadCheck=0;
let fileName;

app.get("/", (req, res) => {
    if(uploadCheck===0)
    return res.render("homepage",{video:"video"});
    else
    res.render("homepage",{video:fileName})
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
    fileName = req.file.filename;
    uploadCheck=1;
    return res.redirect("/");
});


app.get('/download',(req,res)=>{
    const file = `${__dirname}/public/uploads/${fileName}`;
    res.download(file);
});

app.listen(process.env.PORT, () => console.log('Server startd at PORT:8000'));