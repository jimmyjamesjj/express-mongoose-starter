require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var hbs = require('hbs');
const morgan = require('morgan');
const PORT = process.env.PORT

//ensure database is connected
// We connect to our local database here called `todos`
mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true,
useUnifiedTopology: true,})
    .then((self) => {
        console.log('Yayyy Database is connected');
    })
    .catch(() => {
        console.log('Something went wrong with db connection!');
    })


// Register your template engine
// NOTE: 'view engine' is a keyword here. 
// 'hbs' is the extension from which it recongnizes those are template engines
app.set('view engine', 'hbs');

// Register your views to let express know where all the hbs files exist
// NOTE: 'views' is a keyword here.  
// Whenever we specify any path in `res.render` ,
// it will look in that directory that we have set the views as. 
// In our case `__dirname + '/views'`
app.set('views', __dirname + '/views');

// Set up the middleware to make the files inside the public folder
// available throughout the app
app.use(express.static(__dirname + '/public'))


//Allows us to see detailed logs in the console
app.use(morgan('dev'));

//Register partials if needed
//hbs.registerPartials(__dirname + '/views/partials');


// Routes here
app.get('/', (req, res) => {
    res.render('landing.hbs')
})


//Start the server to begin listening on a port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
})