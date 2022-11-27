const BaseDatabase = require('./database')
const Product = require('../models/product')

class ProductDatabase extends BaseDatabase {}

module.exports = new ProductDatabase(Product)