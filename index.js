const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Category = require('./models/category')
const Product = require('./models/product')
const productDatabase = require('./database/productDb');
const categoryDb = require('./database/categoryDb');
const { save, load } = require('./database/categoryDb');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/create-category', (req, res) => {
  const list = categoryDb.load()
  res.render('category', {
    list
  });
});
app.post('/create-category', (req, res) => {
  const categoryName = req.body['category-name']
  const newCategory = new Category(categoryName);

  const result = categoryDb.save(newCategory);
  const list = categoryDb.load()
  console.log('listtt',list);
  res.render('category', {
    list,
    result
  });
});

app.get('/create-product', (req, res) => {
  const list = categoryDb.load()
  if(!list) res.redirect('/')
  const products = productDatabase.load();
  res.render('product', {
    list,
    products
  });
});

app.post('/create-product', (req, res) => {
  const reqbody = req.body;
  console.log(reqbody);
  const productName = reqbody['product-name']
  const categoryUuid = reqbody['category-uuid']
  const newProduct = new Product(productName, categoryUuid, ['imgUrl1', 'imgUrl2'])
  const result = productDatabase.save(newProduct)
  const products = productDatabase.load();
  res.render('product', {
    products,
    result
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
