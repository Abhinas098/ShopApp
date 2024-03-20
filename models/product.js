const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
//<======================================> Get products from FileSystem <=================================>
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

//<======================================> Product Class  <=================================>

module.exports = class Product {
  constructor(prodId, title, imageUrl, description, price) {
    this.id = prodId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      //<======================================>Update Existing  Product <=================================>
      if (this.id) {
        const existingProduct = products.findIndex(
          (prod) => prod.id === this.id
        );
        products[existingProduct] = this;
      }
      //<======================================> Add New Product <=================================>
      else {
        this.id = Math.random().toString();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //<======================================> Delete Product <=================================>

  static deleteOne(id) {
    getProductsFromFile((products) => {
      const filteredProduct = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(filteredProduct), (err) => {
        console.log(err);
      });
    });
  }

  //<======================================> Fetch all from Fs <=================================>

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  //<======================================> Get One from Fs <=================================>
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
