var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

// Accept images (jpeg, png, gif) only
const imageFilter = function (req, file, cb) {
    // accept image only
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
        console.log(req.body);
        console.log(req.file);
        res.sendStatus(204).end('File is uploaded');
    } catch (err) {
        console.log('ERROR upload');
        res.sendStatus(404);
    }
	})
})
/*
    try {
        console.log(req.body);
        console.log(req.file);
        res.sendStatus(204).end('File is uploaded');
    } catch (err) {
        console.log('ERROR upload');
        res.sendStatus(404);
    }
})
*/
router.get('/images', function (req, res){
    try {
        const col = loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    } catch (err) {
        res.sendStatus(404);
    }
})

// Get Homepage
router.get('/', function(req, res){
  res.render('index');
})

// Get Random image page

router.get('/randomly', function(req, res){
  res.render('randomly');
})

module.exports = router;
