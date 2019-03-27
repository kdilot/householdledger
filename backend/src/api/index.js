const api = require('express').Router();
const Category = require('db/model/Category');
const Data = require('db/model/Data');

api.post('/data-list', (req, res) => {
  const { today, year } = req.body
  Data.showAll(today, year).then(result => {
    res.json(result)
  })
})

api.post('/data-add', (req, res) => {
  const { id, title, category, price, type, lastUpdate } = req.body.values
  if (id) {
    Data.editData(id, { title, category, price, type, lastUpdate }).then(result => {
      res.json(result)
    })
  } else {
    const rs = new Data({ title, category, price, type, lastUpdate, display: 1 }).save()
    res.json(rs)
  }
})

api.post('/data-remove', (req, res) => {
  const { _id } = req.body
  Data.removeData(_id).then(result => {
    res.json(result)
  })
})

api.get('/category-list', (req, res) => {
  Category.showAll((err, result) => {
    res.json(result)
  })
})

api.get('/category-add', (req, res) => {
  const params = { title: 'category name', display: 1, lastUpdate: new Date() }
  const rs = new Category(params).save()
  res.json(rs)
})

api.post('/category-edit', (req, res) => {
  const { _id, value } = req.body
  Category.editCategory(_id, value).then(result => {
    res.json(result)
  })
})

api.post('/category-remove', (req, res) => {
  const { _id } = req.body
  Category.removeCategory(_id).then(result => {
    res.json(result)
  })
})

module.exports = api;