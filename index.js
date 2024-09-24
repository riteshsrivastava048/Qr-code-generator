/* import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"
import bodyparser from "body-parser"
import a from "qrcode";
// import fs from "fs"; 
const app = express();
// app.use(express.json());
const port = process.env.PORT || 3000;
// Serve static files like CSS, JS, and images from 'public' folder



const _dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(_dirname)); // for css static files


app.use(bodyparser.urlencoded({extended:true}));



var url = "" ;
function URLgetter(req,res,next){
    console.log(req.body);
    url = req.body["url"];
    next()
}

app.use(URLgetter)


app.get("/",(req,res)=>{
    res.sendFile(_dirname+"/index.html")
})

app.post("/submit",(req,res)=>{
    // res.send(`<h1>${url}<h1>`)
    res.sendFile(_dirname+"/index.html")
    console.log(url)
    a.toFile("imagegenerated.png",url,(err)=>{
        if(err) console.error(err)
        else{
        console.log("generated");
         }
    })
})

// let random = Math.random();

 let url = process.argv[2]; 

app.listen(port,()=>{
    console.log(`Successfull listening on ${port}`);
})



 */

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import a from "qrcode";

const app = express();
const port = process.env.PORT || 3000;

const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(_dirname));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    const url = req.body["url"];
    if (url) {
        a.toDataURL(url, (err, generatedImage) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error generating QR code");
            }

            res.send(`
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./custom.css">
</head>
<body>
    <nav class="w-full h-[70px] sticky top-0 bg-slate-800 flex justify-center items-center">
        <h1> Qr Generator </h1>
    </nav>
<div class="w-full h-full p-10 bg-red-500">
<div class="flex flex-col  md:flex-row md:justify-between gap-10">
    <div class="bg-lime-400 w-full flex justify-start pl-4 pr-4 md:w-2/5">
        <form class="pt-4 w-full" action="/submit" method="post">
        <label class="font-roboto font-semibold text-2xl" for="url">Enter URL :</label>
        <div>
        <input id="urltext" class="outline-double rounded-sm my-4 w-full h-10 mr-5" type="text" name="url" required> 
         </div>
        <input class="flex justify-center w-1/4 mx-auto mt-7 mb-4 py-2  text-[3vw] md:text-[1.5vw] hover:cursor-pointer hover:text-opacity-[0.85] font-semibold bg-white rounded-3xl hover:bg-slate-900 hover:text-white hover:scale-x-105" type="submit" value="Generate">  
        </form>
    </div>
    <div class="bg-yellow-300 w-full flex flex-col items-center justify-center md:w-1/3" >

        <img id="img" class="image h-80" src="${generatedImage}" alt="">
        <div class="flex justify-center">
        <button class="btn flex justify-center items-center gap-3 bg-green-600 px-3 py-1 my-3 rounded-md text-white hover:bg-green-500 hover:scale-x-105">
            <span>Download</span> <svg class="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
        </button>
        </div>
    </div>
</div>
</div>

    <script src="./index.js"></script>
    <script src="./downlaod.js"></script>
</body>
</html>
            `);
        });
    } else {
        res.status(400).send("URL is required");
    }
});

app.listen(port, () => {
    console.log(`Successfully listening on ${port}`);
});

export default app;
