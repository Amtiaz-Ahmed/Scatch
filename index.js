const express           = require('express');
const app               = express();
const path              = require('path');
const cookieParser      = require('cookie-parser');
const expressSession    = require('express-session');
const flash             = require('connect-flash');
const db                = require('./config/mongoose-connection');
const usersRouter       = require('./routes/usersRouter');
const ownersRouter      = require('./routes/ownersRouter');
const productsRouter    = require('./routes/ProductsRouter');
const indexRouter       = require('./routes');
const isLoggedIn = require('./middleware/isLoggedIn');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,('public'))));
app.use(cookieParser());

app.use(
    expressSession({
        resave: false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.set('view engine','ejs');

app.use('/owners'   , ownersRouter);
app.use('/users'    , usersRouter);
app.use('/products' , productsRouter);

app.get('/', (req,res)=>{
    let error =  req.flash("error")
    res.render('index',{error});
});

app.get('/shop',isLoggedIn, (req,res)=>{
    res.render('shop');
});



app.listen(3000);
