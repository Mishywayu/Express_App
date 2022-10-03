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

//set templating engine as ejs
/**this code takes two params; 
 * @1st param: what we are setting (view engine)
 * @2nd param: what we are setting it to (ejs)
 */

//body-parser middleware - this allows us to use body parser in our application. 
//:basicall this will help us get data from the input field.
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs');


//routing

//route for / (root part) basically the home page for most websites
app.get('/',(req, res) => {
    res.render('Home');
});
//VALUE
// app.get('/',(req, res) => {
//     res.render('Home',{value:"Hey"});
// });

//serving static files (css, images, e.t.c) - these are in the public folder
app.use(express.static('public'));

//route for about page
app.get('/about',(req, res) => {
    res.render('About');
});

//route for diary page
app.get('/diary',(req, res) => {
    res.render('Diary');
});

//routes for adding records
app.get('/add',(req, res) => {
    res.render('Add');
});

//route for saving diary
app.post('/add-to-diary', (req, res) => {
    res.send('ADD');
});


/**whenever we are working with backend, a server is usually needed so that 
 * our application can actually run.
 * Express provides this service. It provides a method for creating a server
 */
//the method is app.listen() and it requires a PORT & a CALLBACK FUNCTION.
app.listen(3000, () => {console.log("server is running")});
//Cannot GET /


