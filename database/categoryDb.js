const BaseDatabase = require('./database')
const Category = require('../models/category')

class CategoryDatabase extends BaseDatabase {}

module.exports = new CategoryDatabase(Category)