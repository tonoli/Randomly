var express = require('express');
var router = express.Router();

router.post('/upload', upload.single('image'), function (req, res){
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);

        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    } catch (err) {
        res.sendStatus(404);
    }
})


router.get('/images', function (req, res){
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
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
