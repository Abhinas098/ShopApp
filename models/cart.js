const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  
   //<======================================> Add to Cart <=================================>
  static addProduct(id, prodPrice) {
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(data);
      }

   //<======================================> Find Existing one <=================================>
      const existingProductInd = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductInd];
      let updateProduct;
      

   //<======================================> Update Cart <=================================>
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.qt = updateProduct.qt + 1;
        cart.products = [...cart.products];
        cart.products[existingProductInd] = updateProduct;
      } else {
        updateProduct = { id: id, qt: 1 };
        cart.products = [...cart.products, updateProduct];
      }

      cart.totalPrice = cart.totalPrice + +prodPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
