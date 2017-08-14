
var express = require('express');
var path = require('path');
var fs = require('fs-extra');
var routes = require('./routes/index');

// Init App
var app = express();

// View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Set Static Folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// Set Routes
app.use('/', routes);

// 404 ERROR
app.use(function(req, res, next){
    res.status(404).render('404');
});

// Set Port
app.set('port', (process.env.PORT || 8080));

// Lounch app
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port') + ' 🚀');
});
