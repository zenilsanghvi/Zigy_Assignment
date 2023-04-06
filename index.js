const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 8000;



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + Date.now()+ '.mp4');
    },
});
// + '.mp4'
// const upload = multer({ dest: "uploads/" });
const upload = multer({
    storage:storage
  });
  

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.static("public"));

let uploadCheck=0;
let fileName;

app.get("/", (req, res) => {
    if(uploadCheck===0)
    return res.render("homepage",{video:"video"});
    else
    res.render("homepage",{video:fileName})
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    fileName = req.file.filename;
    uploadCheck=1;
    return res.redirect("/");
});


app.get('/download',(req,res)=>{
    const file = `${__dirname}/public/uploads/${fileName}`;
    res.download(file);
});

app.listen(PORT, () => console.log('Server startd at PORT:8000'));