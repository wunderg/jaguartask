var User = require('./userModel.js');
var Promise = require('bluebird');

module.exports = {
  signin: function(req, res, next){
    console.log(req);
    var username = req.body.username;
    var password = req.body.password;

    var findUser = promise.bind(User.findOne, User);
  },

  signup: function(req, res, next){
    // console.log(req);
    var username = req.body.username;
    var password = req.body.password;
    var newUser = {
      username: username,
      password: password
    };

    console.log('line 22');
    User.findOne({username: username}).exec()
      .then(function(user) {
        if (user) {
          console.log('userExists');
          // console.log(user);
          res.sendStatus(200)
        } else {
          new User(newUser).save()
      .then(function() {
              res.sendStatus(200);
          });
        }
      })
    .then(null, function(err) {
      console.log(err);
      res.send(200);
    })
      // .then(function(user) {
      //   if(user) {
      //     console.log('user Exist');
      //   } else {
      //     console.log(user);
      //   }
      // }):w
      // :
      // .catch(function(err) {
      //   console.log(err);
      // })
  }
};
