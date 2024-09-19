require('dotenv').config();

const bodyParser = require('body-parser');

let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false}));

const absolutepath = __dirname + '/views/index.html';

app.use((req,res,next) => {
    let stringPath= req.method + " " + req.path + " - " + req.ip;
    console.log(stringPath);
    next();
})

//to call the style.css in static way 
app.use('/public', express.static(__dirname+"/public"));

app.get("/", (req, res) => {
    res.sendFile(absolutepath);
  });

app.get("/json", (req,res)=> {
    if(process.env.MESSAGE_STYLE == "uppercase")
    {
        res.json({"message": "HELLO JSON"});
        
    }else{
        res.json({"message": "Hello json"});
    }
    
})

app.get("/now", (req,res,next) => {
    req.time = new Date().toString();
    next();
},
(req,res) => {

    res.json({
        "time": req.time
    })
}
)

app.get("/:word/echo", (req,res)=>{
    //doing like this make the word can be anything the user want
    const { word } = req.params

    res.json({
        "echo": word
    })
})

app.get("/name", (req,res) => {
    // var first = req.query.first;
    // var last = req.query.last;

    var { first: firstName, last: lastName } = req.query;

    res.json({
        name: `${firstName} ${lastName}`
    })
})

app.post("/name", (req,res) => {
    var {first: firstName, last: lastName} = req.body;

    res.json({
        name:  `${firstName} ${lastName}`
    })
})

console.log("Hello World");



































 module.exports = app;
