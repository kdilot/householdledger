const api = require('express').Router();
const Category = require('db/model/Category');

api.get('/category-list', (req, res) => {
  Category.showAll((err, result) => {
    res.json(result)
  })
})

api.get('/category-add', (req, res) => {
  const data = { title: 'category name', display: 1, lastUpdate: new Date() }
  const currency = new Category(data)
  const rs = currency.save()
  res.json(rs)
})

api.post('/category-remove', (req, res) => {
  const { _id } = req.body
  Category.removeCategory(_id).then(result => {
    res.json(result)
  })
})

module.exports = api;