
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var Loki = require('lokijs');
var fs = require('fs');
var routes = require('./routes/index');



// Init App
var app = express();

// View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// Set Routes
app.use('/', routes);

// 404 ERROR
app.use(function(req, res, next){
    res.status(404).render('404');
});

// multer configuration
const COLLECTION_NAME = 'images';
const upload = multer({ dest: './uploads' });
const db = new Loki('./uploads/db.json', { persistenceMethod: 'fs' });

// Set Port
app.set('port', (process.env.PORT || 3000));

// Lounch app
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port') + ' 🚀');
});
