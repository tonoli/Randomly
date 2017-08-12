var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

// Multer config + Storage
const imageFilter = function (req, file, callback) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

const upload = multer({
  dest: './uploads',
  fileFilter : imageFilter,
});

router.post('/', upload.single('image'), function (req, res){
    try {
        console.log(req.body);
        console.log(req.file);
        res.send({filename : 'image-'+ Date.now() + path.extname(file.originalname)}).end('File is uploaded');
    } catch (err) {
        console.log('ERROR upload');
        res.sendStatus(404);
    }
})

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
