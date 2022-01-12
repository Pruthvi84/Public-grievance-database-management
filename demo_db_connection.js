// connection.query('INSERT INTO  employee_details(id,employee_name, employee_designation) VALUES(4,"John", "HR Manager")',(err,rows)=>{
//   if(err){
//      throw err
//    }
//    else{
//      console.log('Data sent bois');
//      console.log(rows);
//    }
//  })
// connection.query("CREATE TABLE UserInfo(ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,UserID AS 'UID' + RIGHT('00000000' + CAST(ID AS VARCHAR(8)), 8) PERSISTED,name varchar(45), address varchar(250)",(err,rows)=>{
//   if(err){
//      throw err
//    }
//    else{
//      console.log('Data sent bois');
//      console.log(rows);
//    }
//  })

const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
app.use(express.json())
const ejs = require("ejs");
const mysql = require("mysql")
var session = require('express-session');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost", //This is your localhost IP
  user: "Pruthvi Bhat", // "newuser" created in Step 1(e)
  password: "pruthvibhat@84", // password for the new user
  database: "employee_info", // Database name
  port: "3306", // port name, "3306" by default
	multipleStatements: true
})
db.getConnection((err, connection) => {
  if (err) throw (err)
  console.log("DB connected successful: " + connection.threadId)
})
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get("/firstpage", function(req, res){
  res.render("firspage");
});
app.get("/sewageboard", function(req, res){
  res.render("sewageboard");
});
app.get("/electricityboard", function(req, res){
  res.render("electricityboard");
});
app.get("/waterboard", function(req, res){
  res.render("waterboard");
});
app.get("/registration", function(req,res){
  res.render("signup");
})
app.get("/loginpage", function(req,res){
  res.render("login");
})
app.get("/dashboard", function(req,res){
  res.render("dashboard")
})
app.get("/roadconstruction", function(req,res){
  res.render("roadconstruction")
})
app.get("/roadmaintenance", function(req,res){
  res.render("roadmaintenance")
})
app.get("/roadtransport", function(req,res){
  res.render("roadtransport")
})
app.get("/status",function(req,res){
res.render("status");
});


app.post('/registration',function(req,res){
const username=req.body.username;
const password=req.body.password;
const confirmpassword=req.body.confirmpassword;
const phonenumber=req.body.phonenumber;
db.query('INSERT INTO log(username,password,confirmpassword,phonenumber) VALUES("'+username+'","'+password+'", "'+confirmpassword+'","'+phonenumber+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
res.redirect('/loginpage');
})

app.post('/loginpage', function(req, res) {

	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post("/waterboard",function(req,res){
const phonenumber = req.body.phonenumber;
const address = req.body.AddressWaterBoard;
const wateravailability = req.body.WaterAvailability;
const meterfault=req.body.MeterFault;
const pipeline=req.body.PipelineAndInfrastructure;
const textwb = req.body.textWB;
db.query('INSERT INTO waterboard(phonenumber,address, wateravailability, meterfault, pipeline, textwb,status) VALUES("'+phonenumber+'","'+address+'", "'+wateravailability+'","'+meterfault+'","'+pipeline+'","'+textwb+'","notcomplete")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
})
app.post("/sewageboard",function(req,res){
var phonenumber = req.body.phonenumber;
var address = req.body.addresssewagboard;
var landmark=req.body.Landmark;
const manholeissue=req.body.ManholeIssue;
const drainageissue=req.body.DrainageIssue;
const garbageissue=req.body.Garbage;
const textsb = req.body.textSB;
db.query('INSERT INTO sewageboard(phonenumber,address, landmark, manholeissue, drainageissue, garbageissue,textsb) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+manholeissue+'","'+drainageissue+'","'+garbageissue+'","'+textsb+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
})
app.post("/electricityboard",function(req,res){
const phonenumber = req.body.phonenumber;
const address = req.body.address;
const landmark=req.body.Landmark;
const linebreakdown=req.body.LineBreakDown;
const billingissue=req.body.BillingIssue;
const newconnection=req.body.NewConnection;
const texteb = req.body.textEB;
db.query('INSERT INTO electricityboard(phonenumber,address, landmark, linebreakdown, billingissue, newconnection,texteb) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+linebreakdown+'","'+billingissue+'","'+newconnection+'","'+texteb+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
})
app.post("/roadconstruction",function(req,res){
const phonenumber = req.body.phonenumber;
const address = req.body.Address;
const landmark=req.body.Landmark;
const pincode=req.body.Pincode;
const area=req.body.Area;
const landavailable=req.body.LandAvailable;
const textrc = req.body.textC;
db.query('INSERT INTO roadconstruction(phonenumber,address, landmark, pincode, area, landavailable,textc) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+pincode+'","'+area+'","'+landavailable+'","'+textrc+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
})
app.post("/roadtransport",function(req,res){
var phonenumber = req.body.phonenumber;
var slandmark = req.body.SLandmark;
var flandmark = req.body.FLandmark;
var staffbehaviour = req.body.StaffBehaviour;
const textrt = req.body.textRT;

db.query('INSERT INTO roadtransport(phonenumber,slandmark, flandmark, staffbehaviour, textrt) VALUES("'+phonenumber+'","'+slandmark+'", "'+flandmark+'","'+staffbehaviour+'","'+te+'","'+textwb+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
})

app.post("/roadmaintenance",function(req,res){
var phonenumber = req.body.Phonenumber;
var address = req.body.AddressRoadMain;
var landmark = req.body.Landmark;
var pincode = req.body.Pincode;
var area = req.body.Area;
var qor=req.body.QualityOfRoad;
var textrm = req.body.textRM;

db.query('INSERT INTO roadmaintenance(phonenumber,address, landmark, pincode, area,qor,textrm) VALUES("'+phonenumber+'","'+address+'", "'+landmark+'","'+pincode+'","'+area+'","'+qor+'","'+textrm+'")',(err,rows)=>{
if(err){
throw err
}
else{
console.log('Data sent bois');
console.log(rows);
}
})
})

app.post("/status",function(req,res){
var ph=req.body.phone;
var sql = "SELECT address,phonenumber, complaintid FROM waterboard w WHERE w.phonenumber = ?;SELECT phonenumber,address, complaintid FROM electricityboard e WHERE e.phonenumber= ?;SELECT phonenumber,address, complaintid FROM sewageboard sw WHERE sw.phonenumber= ?;SELECT phonenumber,address, complaintid FROM roadmaintenance rm WHERE rm.phonenumber= ?";
db.query(sql, [ph,ph,ph,ph], function(error, results, fields) {
if (error) {
throw error;
}
res.render("design",{items:results[0],items1:results[1],items2:results[2],items3:results[3]});
});
})

const port = process.env.PORT || 3000;
app.listen(port)
console.log("app is listening on port" + port);
