
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var routes = require('./routes/index');

// MongoDB setting
mongoose.connect('mondb://');
var db = mongoose.connection;

// Init App
var app = express();

// View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Routes
app.use('/', routes);

// 404 ERROR
app.use(function(req, res, next){
    res.status(404).render('404');
});

// Set Port
app.set('port', (process.env.PORT || 3000));

// Lounch app
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port') + ' 🚀');
});
