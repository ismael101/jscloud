const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req,res,next) => {
    User.find({username: req.body.username})
      .then(user => {
          bcrypt.compare(req.body.password,user[0].password)
          .then(result => {
              if(result){
                  const token = jwt.sign({id: user[0]._id, profilepic:user[0].profilepic, username:user[0].username},process.env.SIGNATURE,{expiresIn:'3h'})
                  res.status(200).json({
                      token:token,
                      pic:user[0].profilepic
                  })
              }
              else{
                  res.status(500).json({
                      message:'Auth Failed'
                  })
              }
          })
          .catch(err => {
              res.status(500).json({
                  error:err
              })
          })
      })  
      .catch(err => {
          res.status(500).json({
              error:err
          })
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.signup = (req,res,next) => {

    User.find({ username: req.body.username })
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username:req.body.username,
              password: hash,
              profilepic: `http://localhost:5000/${req.file.path}`
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });

}