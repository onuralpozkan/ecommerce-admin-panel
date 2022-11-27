const fs = require('fs');

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.fileName = model.name;
  }

  save(object) {
    const productUuid = object.uuid;
    const hasProduct = this.findBy(productUuid);
    const products = this.load();
    products.push(object);
    fs.writeFileSync(
      `./output/${this.fileName}.json`,
      JSON.stringify(products, null, 2)
    );
  }
  load() {
    const products = fs.readFileSync(`./output/${this.fileName}.json`);
    if (products === undefined)
      throw new Error('There is not any json file name' + this.fileName);
    return JSON.parse(products);
  }
  findBy(uuid) {
    const products = this.load();
    if (products.length) {
      const product = products.find((product) => (product.uuid = uuid));
      if (!product) {
        //throw new Error('There is not any product with id: ' + id)
        return false;
      }
      return product;
    }
    throw new Error('There is not any product');
  }
}

module.exports = BaseDatabase;
