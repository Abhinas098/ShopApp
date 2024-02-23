const path = require("path");
const fs = require("fs");

const dirPath = require("../util/path");

const p = path.join(dirPath, "data", "products.json");

const getProducts = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  push() {
    getProducts((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products),(err) => {
        console.log(err);
      });
    });
  }
  static getAll(cb) {
    getProducts(cb);
  }
};
