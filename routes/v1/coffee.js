var express = require('express');
var router = express.Router();
let DripModel = require('../../models/dripModel.js');
let TypeModel = require('../../models/typeModel.js');


// drip

// drip count by user
// in: user_id, type

// delete drip document

router.post('/', (req, res) => {
  let Drip = new DripModel();
  Drip.user_id = req.body.user_id;
  Drip.type = req.body.type;
  // Drip.setDate();
  Drip.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});

router.get('/:id/:type', function(req, res, next) {
  let userId = req.params.id;
  let dripType = req.params.type;
  DripModel.count({user_id: userId, type: dripType}, (err, c) => {
    console.log(c);
    TypeModel.findOne({id: dripType}, (err, docs) => {
      console.log(docs);
      let price = docs.price;
      res.json({
        "count": c,
        "price": c * price
      });
    });
  });
});

router.get('/range/:id/:type', function(req, res, next) {
  let userId = req.params.id;
  let dripType = req.params.type;
  // Set the range to select date
  // ref : https://www.quora.com/Node-js-How-do-range-query-in-mongoose
  DripModel.count({user_id: userId, type: dripType, "date": {'$gte': new Date('3/24/2017'), '$lt': new Date('4/20/2017')}}, (err, c) => {
    console.log(c);
    TypeModel.findOne({id: dripType}, (err, docs) => {
      console.log(docs);
      let price = docs.price;
      res.json({
        "count": c,
        "price": c * price
      });
    });
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
