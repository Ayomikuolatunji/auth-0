const User = require('../models/user');

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
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
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
      const newUser=new User({
          email:email,
          password:password,
          cart:{items:[]}
      })
      return  newUser.save()
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
