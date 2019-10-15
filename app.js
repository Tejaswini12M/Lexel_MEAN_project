var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/EmployeeDB'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express();
var http = require('http').Server(app);

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/sign_up', function(req,res){ 
	var email =req.body.email; 
	var pass = req.body.password; 

	var data = { 
		"email":email, 
		"password":pass, 
    } 
    console.log("req.body",req.body);
    console.log('data',data);

    db.collection('employees').findOne(data,function(err,collection){
        if(err){
            db.collection('employees').insertOne(data,function(err,collection){
                if(err) throw err;
                alert("Record inserted Successfully");
            });
            return res.redirect('/annomap.html');
        }
	}); 
		
    return res.send('annomap.html');
}) 


// app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData.save()
//     .then(item => {
//     res.send("item saved to database");
//     })
//     .catch(err => {
//     res.status(400).send("unable to save to database");
//     });
//    });

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });


console.log("server listening at port 3000"); 

