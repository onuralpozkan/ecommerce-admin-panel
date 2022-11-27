const { v4: uuidv4 } = require('uuid');
class Category {
  constructor(name) {
    this.name = name;
    this.uuid = uuidv4();
  }
}
module.exports = Category;
