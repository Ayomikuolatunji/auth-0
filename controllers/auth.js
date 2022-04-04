const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email=req.body.email
  const password=req.body.password
  User.findById({email:email})
    .then(user => {
     if(!email){
      req.session.isLoggedIn = true;
      req.session.user = user;
       return  req.session.save(err => {
        return res.redirect("/login")
      });
     }
     bcrypt.compare(password, user.password)
     .then(data=>{
        if(data){
          res.redirect("/")
        }
        res.redirect("/login")
     })
     .catch(err=>{
       res.redirect("/login")
     })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email=req.body.email
    const password=req.body.password
    const comfirmPassword=req.body.password;
    User.find({email:email})
    .then(user=>{
      if(user){
         res.redirect("/")
      }
      return  bcrypt.hash(password,12)
      .then(passwordHashed=>{
        const newUser=new User({
          email:email,
          password:passwordHashed,
          cart:{items:[]}
      })
        return  newUser.save()
      })
    })
    .then(user=>{
        return  res.redirect("/login")
    })
    .catch(err=>{
       console.log(err)
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
