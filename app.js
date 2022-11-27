const Category = require('./models/category');
const Product = require('./models/product');
const productDatabase = require('./database/productDb')
const categoryDatabase = require('./database/categoryDb')
const newCategory = new Category('Elektronik');
console.log(newCategory);
categoryDatabase.save(newCategory)
const product1 = new Product(newCategory.uuid, 'Laptop', 'url');
console.log(product1);
productDatabase.save(product1)

