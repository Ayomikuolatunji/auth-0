const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session=require("express-session")
const errorController = require('./controllers/error');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();


const store = new MongoDBStore({
  uri: 'mongodb+srv://mongoose:john123@cluster0.xcjno.mongodb.net/myMongooseDatabase',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"my secret", resave:false,saveUninitialized:false,store:store}))


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user= user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(errorController.get404)

mongoose
  .connect(
    'mongodb+srv://mongoose:john123@cluster0.xcjno.mongodb.net/myMongooseDatabase',{
         useNewUrlParser: true,
         useUnifiedTopology: true 
  }
  )
  .then(con=>{
    console.log("connected to the database")
  })
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(5000,()=>{
      console.log("port running on localhost 3000")
    });
  })
  .catch(err => {
    console.log(err);
  });