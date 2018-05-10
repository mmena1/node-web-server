const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//middleware - basic logger
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Under Maintenance',
        maintenanceMessage: 'This website is under maintenance, it will be back soon.'
    });
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => { //set a handler for GET requests on the root of the server, namely: localhost:3000
    //res.send('<h1>Hello Express!</h1>'); //response to show to the user when visiting the handler
    // res.send({
    //     name: 'Martin',
    //     likes: [
    //         'Biking',
    //         'Metal'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Welcome message!'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Error',
        errorMessage: 'Bad request.'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}); //bind the applicaion to a port