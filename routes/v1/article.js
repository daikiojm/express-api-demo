var express = require('express');
var router = express.Router();
let ArticleModel = require('../../models/articleModel.js');

router.post('/', (req, res) => {
  let Article = new ArticleModel();
  Article.title = req.body.title;
  Article.text = req.body.text;
  Article.setDate();
  Article.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "this is article"
  })
});

router.get('/:id', function(req, res, next) {
  let Articleid = req.params.id;
  ArticleModel
    .findById(Articleid, (err, article) => {
      res.json(article);
    });
});

router.delete('/:id', function(req, res, next) {
  let Articleid = req.params.id;
  ArticleModel.remove({_id:Articleid})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
