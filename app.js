/**
 * Now that we have installed our dependecies that we need, we will bring 
 * the express that we installed here
 */

//acquring express and storing it in our variable 'express'
const express = require('express');

/** with the help of the app variable, we will be able to use all the methods 
 * that node express provides
 */
const app = express();

// const bodyparser = require('body-parser');
const bodyParser = require('body-parser');

//this dependecy allows us to connect to our database and have access to data
const mongoose = require('mongoose');

//calling the method-override dependecy
const methodOverride = require('method-override');

//set templating engine as ejs
/**this code takes two params; 
 * @1st param: what we are setting (view engine)
 * @2nd param: what we are setting it to (ejs)
 */

//middleware for override dependency
app.use(methodOverride('_method'));

//body-parser middleware - this allows us to use body parser in our application. 
//:basicall this will help us get data from the input field.
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');

//DATABASE URL
const url = 'mongodb+srv://Mishywayu:1234@projectexpress.7gxtzyu.mongodb.net/?retryWrites=true&w=majority';
//connecting application with database
/**the connect() method is what connects to our database. It requires two things;
 * 1. the db URL which is saved in the url variable. &
 * 2. a method;the parameters
*/
/**when the db is connectedit will send a promice. we can get that promise with the help of then().
 * This is basically, when the mongose.connect method runs successfully, we will get a message that says "MogoDB is connected" (the promise).
 * However, if an error happens along the process, we will get the error with the help of the catch() method.
 */
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB is connected"))
    .catch(err => console.log(err));

// importing Diary Model
const Diary = require('./models/Diary');

//ROUTING
//route for / (root part) basically the home page for most websites
app.get('/', (req, res) => {
    res.render('Home');
});
//VALUE
// app.get('/',(req, res) => {
//     res.render('Home',{value:"Hey"});
// });

//serving static files (css, images, e.t.c) - these are in the public folder
app.use(express.static('public'));

//route for about page
app.get('/about', (req, res) => {
    res.render('About');
});

//route for diary page
app.get('/diary', (req, res) => {

    //fetching data from the db at displaying it on the diary page
    Diary.find().then(data => {
        res.render('Diary', { data: data });
    }).catch(err => console.log(err));
});

//routes for adding records
app.get('/add', (req, res) => {
    res.render('Add');
});

//route for saving diary
app.post('/add-to-diary', (req, res) => {
    //saving the data on the database
    const Data = new Diary({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });

    Data.save().then(() => {
        res.redirect('/diary');
    }).catch(err => console.log(err));
});

//route for displaying records
app.get('/diary/:id', (req, res) => {
    Diary.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('Page', { data: data });
    }).catch(err => console.log(err));
});

//route for edit page
app.get('/diary/edit/:id', (req, res) => {
    Diary.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('Edit', { data: data })
    }).catch(err => console.log(err));
});

//EDIT data
app.put('/diary/edit/:id', (req, res) => {
    Diary.findOne({
        _id: req.params.id
    }).then(data => {
        data.title = req.body.title
        data.description = req.body.description
        data.date = req.body.date

        data.save().then(() => {
            res.redirect('/diary');
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
})

//delete from database
app.delete('/data/delete/:id', (req, res) => {
   Diary.remove({
    _id: req.params.id
   }).then(() => {
    res.redirect('/diary');
   }).catch(err => console.log(err));
})

/**whenever we are working with backend, a server is usually needed so that 
 * our application can actually run.
 * Express provides this service. It provides a method for creating a server
 */
//the method is app.listen() and it requires a PORT & a CALLBACK FUNCTION.
app.listen(3000, () => { console.log("server is running") });
//Cannot GET /


