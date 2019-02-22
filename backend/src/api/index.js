const api = require('express').Router();
const Category = require('db/model/Category');
console.log(1)

api.get('/test', function (req, res) {
  res.json('test');
})

api.get('categorylist', (req, res) => {
  console.log(2)
  Category.showAll((err, result) => {
    res.json(result)
  })
})

module.exports = api;