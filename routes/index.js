var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

// Accept images (jpeg, png, gif) only
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(console.log('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, 'images_' + Date.now() + path.extname(file.originalname))
	}
})

router.post('/', function(req, res) {
	var upload = multer({
		storage: storage,
		fileFilter: imageFilter,
	}).single('image');
	upload(req, res, function(err) {
    try {
        res.redirect('/');
    } catch (err) {
        res.sendStatus(404);
    }
	})
})

// Galerie des images (to do)

// Get Homepage
router.get('/', function(req, res){
  var fileNames = fs.readdirSync('./uploads');
  res.render('index', {nb : fileNames.length});
})

// Get Random image page
router.get('/randomly', function(req, res){

// Get a random image through the uploads folder
  var fileNames = fs.readdirSync('./uploads');
  var index = Math.floor(Math.random() * fileNames.length)
  var image = fileNames[index];
  res.render('randomly', {image : image} );
})

module.exports = router;
