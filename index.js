 import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import bodyparser from "body-parser"
import a from "qrcode";
// import fs from "fs"; 
const app = express();
// app.use(express.json());
const port = process.env.PORT || 3000;
// Serve static files like CSS, JS, and images from 'public' folder



const _dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(_dirname, 'public')))
app.use(express.static("public")); // for css static files


app.use(bodyparser.urlencoded({extended:true}));



var url = "" ;
function URLgetter(req,res,next){
    console.log(req.body);
    url = req.body["url"];
    next()
}

app.use(URLgetter)




app.post("/submit",(req,res)=>{
    const url = req.body.url
    const filepath = path.join(_dirname,'public' ,'imagegenerated.png'); 
    res.sendFile(_dirname+"/index.html")
    console.log(url)
    a.toFile(filepath,url,(err)=>{
        if(err) console.error(err)
        else{
        console.log("generated");
         }
    })
})

app.get("/",(req,res)=>{
    res.sendFile(_dirname+"/index.html")
})

// let random = Math.random();

//  let url = process.argv[2]; 

app.listen(port,()=>{
    console.log(`Successfull listening on ${port}`);
})



/*
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

// Setting up the Express server
const app = express();
const port = process.env.PORT || 3000;

// Determine the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse the body
app.use(bodyParser.urlencoded({ extended: true }));

// Handle the form submission
app.post('/submit', (req, res) => {
    const url = req.body.url;
    const filePath = path.join(__dirname, 'public', 'imagegenerated.png');

    // Generate the QR code and save it in the 'public' folder
    QRCode.toFile(filePath, url) => {
            console.log('QR code generated successfully');
            res.redirect('/');  // Redirect to homepage after submission
        })

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); */
