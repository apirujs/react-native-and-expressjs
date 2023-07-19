const express = require('express');
var admin = require("firebase-admin");
var bodyParser = require('body-parser')

var serviceAccount = require("./barademo-rangsit-plaza-firebase-adminsdk-sqmyi-79cc3a5745.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://barademo-rangsit-plaza-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.database();
const ref = db.ref("/");

const server = express();
const port = 3000;
server.set('view engine', 'ejs');
server.use(express.static('./public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/get/pins', (req, res) => {
  ref.child('pins');
  res.set('Content-Type', 'application/json')
  ref.once("value", function (snapshot) {
    //console.log(snapshot.val());
    res.status(200).json(snapshot.val() );
  });
})

server.post('/saving/pins', (req, res) => {
  const usersRef = ref.child('pins');
  console.log(req.body);
  try{
    //let SaveData = JSON.parse(req.body);
    usersRef.set(JSON.stringify(req.body),(err)=>{
      console.log("then");
      /*if(err) throw(err);
      SaveData.map(element => {
        let id = String(element.index);
        usersRef.push({id:element});
      });*/
    });

    
    res.sendStatus(200);
  }catch(err){
    console.log(err);
    res.sendStatus(500);
  }
  //res.sendStatus(200);
})

server.get('/*', (req, res) => {
  res.render('index');
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
