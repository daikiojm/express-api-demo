'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: String,
  text: String,
  date: String
});

ArticleSchema.methods.setDate = () => {
  this.date = moment().format("YYYY-MM-DD HH:mm:ss");
};

module.exports = mongoose.model('ArticleModel', ArticleSchema);
