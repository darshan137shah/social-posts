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

var postSchema= new mongoose.Schema({
  title: String,
  desc: String,
  createdBy: String,
  likes: {
    type: Array
  },
  comments: {
    type: Array
  }
})

var Post= mongoose.model('Post', postSchema);

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
        var token = jwt.sign({username: req.body.username}, 'thisisasecretkey', {
          expiresIn: '1h'
        });
        res.send({isLoggedIn: true, token: token, username: data[0].username});
      } else {
        res.send({isLoggedIn: false})
      }
    })
  }
})

app.use(function(req, res, next) {
  var token = req.body.token || req.headers['token'];
  jwt.verify(token, 'thisisasecretkey', function(err, decoded) {
    if(!err && decoded) {
      req.decoded = decoded;
      next();
    } else {
      res.send({
        flag: "Error",
        err: "Token is not verfied"
      })
    }
  })
})

app.get('/userData', function(req, res) {
  User.find({username: req.decoded.username}, function(err, data) {
    if(!err) {
      res.send(data);
    } else {
      res.send({err: 'Error'})
    }
  })
})

app.post('/newPost', function(req, res) {
  if(req.body.title && req.body.desc) {
    req.body.createdBy = req.decoded.username;
    console.log(req.body);
    Post.create(req.body, function(err, data) {
      if(!err)  {
        res.send({isPosted: true})
      } else {
        res.send({isPosted: false})
      }
    })
  }
});

app.get('/getPosts', function(req, res) {
  Post.find({createdBy: req.decoded.username}, function(err, data) {
    if(!err) {
      res.send(data);
    }
  })
});

app.post('/findPost', function(req, res) {
  console.log(req.body._id);
  Post.findById(req.body._id, function(err, data) {
    console.log(data);
  })
})

app.post('/addComment', function(req, res) {
  Post.findByIdAndUpdate(req.body._id, {$push: {comments: req.body.comment}}, function(err, data) {
    if(!err) {
      res.send({
        commAdded: true
      })
    } else {
      res.send({
        commAdded: false
      })
    }
  })
})

db.on('error', console.error.bind(console, 'MongoDB is not connected!'));
db.once('open', function() {
  app.listen('3000', function() {
    console.log('Server Started!');
  })
  console.log("DB Connected!");
});
