const { v4: uuidv4 } = require('uuid');
class Product {
  constructor(name,categoryId, imgUrls) {
    this.name = name;
    this.categoryId = categoryId;
    this.uuid = uuidv4();
    this.imgUrls = imgUrls;
  }
}
module.exports = Product;
