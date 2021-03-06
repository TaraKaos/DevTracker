var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require('mongoose'),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOveride = require("method-override"),
    User          = require("./models/user");

//requiring routes
var indexRoutes   = require("./routes/index"),
    authRoutes    = require("./routes/auth"),
    projectRoutes = require("./routes/projects");

var dbURL = process.env.DEVTRACKER_BOOK_DB_URL || "mongodb://localhost:27017/devtracker";
var dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(dbURL, dbOptions)
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOveride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "This is my secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next)
{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// setup routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(projectRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function()
{
    console.log("The Dev Tracker server has started!");
});