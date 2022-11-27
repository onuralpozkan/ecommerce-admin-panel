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

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/create-product', (req, res) => {
  res.render('product');
});
app.get('/create-category', (req, res) => {
  res.render('category');
});
app.post('/create-product', (req, res) => {
  const reqbody = req.body;
  console.log(reqbody);
  const productName = reqbody['product-name']
  const categoryName = reqbody['category-name']
  const category1 = new Category(categoryName);
  const product1 = new Product(productName, category1.uuid, ['imgUrl1', 'imgUrl2'])
  productDatabase.save(product1)
  res.render('product-list')
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
