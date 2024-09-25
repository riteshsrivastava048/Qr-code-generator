import express from "express"
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
app.use(express.static("public")); // for css static files


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
    a.toFile("public/imagegenerated.png",url,(err)=>{
        if(err) console.error(err)
        else{
        console.log("generated");
         }
    })
})

// let random = Math.random();

//  let url = process.argv[2]; 

app.listen(port,()=>{
    console.log(`Successfull listening on ${port}`);
})



