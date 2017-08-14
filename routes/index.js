var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');

// Accept images (jpeg, png, gif) only
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(console.log('File not supported'), false);
    }
    cb(null, true);
};

// Set the path and the name of the saved files for multer storage
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, 'images_' + Date.now() + path.extname(file.originalname))
	}
})

// Upload images thanks to multer middleware
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

// Get all the images names in the upload folder in an array thanks to FileSystem middleware
var fileNames = fs.readdirSync('./uploads');
console.log(fileNames);

// Get Homepage
router.get('/', function(req, res){
  fileNames = fs.readdirSync('./uploads');
  res.render('index', {nb : fileNames.length});
})

// Get Random image page
router.get('/randomly', function(req, res){
// Get a random image through the uploads folder
  fileNames = fs.readdirSync('./uploads');
  console.log(fileNames);
  var index = Math.floor(Math.random() * fileNames.length)
  var image = fileNames[index];
  res.render('randomly', {image : image} );
})

// Clear all the files in the uploads folder
// We get all the names of the files in the folder then romove them then we reload
router.get('/clear', function(req, res){
  var i = 0;
  fileNames = fs.readdirSync('./uploads');
  while (i < fileNames.length){
    fs.remove('./uploads/' + fileNames[i], function(err){
      if (err) return console.error(err)
      console.log('Successfuly deleted')
    })
    i++;
  }
  res.redirect('/');
})

module.exports = router;
