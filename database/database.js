const fs = require("fs");

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.fileName = model.name;
  }

  save(object) {
    const objectsArray = this.load();
    console.log({ objectsArray });
    const hasSameName = objectsArray.find(
      (o) => o.name.toLowerCase() === object.name.toLowerCase()
    );

    if (hasSameName) {
      return new Error(
        "Same " + this.fileName + " name was created before, please select different name!!!",
        {message: 'HATA VAR'}
      );
    }

    objectsArray.push(object);

    console.log({ after: objectsArray });

    fs.writeFileSync(
      `./output/${this.fileName}.json`,
      JSON.stringify(objectsArray, null, 2)
    );
  }
  load() {
    const products = fs.readFileSync(`./output/${this.fileName}.json`);
    if (products === undefined) throw new Error("There is not any json file name" + this.fileName);
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
    throw new Error("There is not any product");
  }
}

module.exports = BaseDatabase;
