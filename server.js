var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  jwt = require('jsonwebtoken'),
  app = express();

app.use(cors({
    origin: "http://localhost:4200"
  }
));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/social_app');

mongoose.Promise = global.Promise;
var db = mongoose.connection;

var userSchema= new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String
})

var User = mongoose.model('User', userSchema);

app.post('/reguser', function(req, res) {
  if(req.body) {
    User.find({username: req.body.username}, function(err, data) {
      if(data.length > 0) {
        res.send({userexists: true});
      } else {
        User.create(req.body, function(err, data) {
          if(!err) {
            res.send({isRegistered: true, username: req.body.username, password: req.body.password});
          } else {
            res.send({isRegistered: false})
          }
        })
      }
    })
  } else {
    res.send({isRegistered: false})
  }
});

app.post('/login', function(req, res) {
  if(req.body.username.length) {
    User.find({username: req.body.username, password: req.body.password}, function(err, data) {
      if(data.length > 0){
        var token = jwt.sign({username: req.body.username}, 'atercesyeksihtsi', {
          expiresIn: '1h'
        });
        res.send({isLoggedIn: true, token: token, username: req.body.username});
      } else {
        res.send({isLoggedIn: false})
      }
    })
  }
})

db.on('error', console.error.bind(console, 'MongoDB is not connected!'));
db.once('open', function() {
  app.listen('3000', function() {
    console.log('Server Started!');
  })
  console.log("DB Connected!");
});


