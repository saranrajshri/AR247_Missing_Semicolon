// Schema
const Product = require("../../models/ProductsSchema");
const Supplier = require("../../models/SupplierSchema");
const CertifiedSeed = require("../../models/CertifiedSeeds");

let product = (module.exports = {});

const fetchProductsOfASupplier = (req, supplierID) => {
  var client = req.app.get("client");
  Product.find({ supplierID: supplierID })
    .then(response => {
      client.emit("products", response);
    })
    .catch(() => {
      client.emit("products", []);
    });
};

// Add a new product to the DB
product.add = (req, res) => {
  var data = req.body;
  Product.find({ barCode: req.body.barCode }).then(products => {
    if (products.length == 0) {
      var newProduct = new Product(data);
      newProduct
        .save()
        .then(response => {
          fetchProductsOfASupplier(req, req.body.supplierID);
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(400).send({ message: "Failed to add product" });
        });
    } else {
      res.status(400).send({ message: "Bar code already exists" });
    }
  });
};

// Update a product
product.update = (req, res) => {
  var data = req.body;
  Product.findOneAndUpdate(
    { barCode: req.params.barCode },
    {
      barCode: data.barCode,
      productName: data.productName,
      imageURL: data.imageURL,
      productPrice: data.productPrice,
      availableQuantity: data.availableQuantity,
      supplierID: data.supplierID
    }
  )
    .then(response => {
      fetchProductsOfASupplier(req, req.body.supplierID);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send({ message: "Failed to update product" });
    });
};

// Delete a prodcut
product.delete = (req, res) => {
  Product.findOneAndRemove({ barCode: req.params.barCode })
    .then(() => {
      fetchProductsOfASupplier(req, req.params.supplierID);
      res.status(200).send({ message: "Product Deleted Successfully" });
    })
    .catch(() => {
      res.status(400).send({ message: "Failed to delete product" });
    });
};

// get all products of a supplier
product.getProductsOfASupplier = (req, res) => {
  fetchProductsOfASupplier(req, req.params.supplierID);
};

// get products (end user route)
product.getAll = async (req, res, next) => {
  try {
    const products = await Product.find({ isHidden: false });
    res.send(products);
  } catch (err) {
    next(err);
  }
};

// add certified seed
product.addCertifiedSeed = async (req, res, next) => {
  try {
    const seed = new CertifiedSeed(req.body);
    const count = await CertifiedSeed.find({}).count();
    seed.barCode = "BSC" + parseInt(count + 1);
    const saved = await seed.save();

    res.send(saved);
  } catch (err) {
    next(err);
  }
};

product.getCertifiedSeedsOfASupplier = async (req, res, next) => {
  try {
    const result = await CertifiedSeed.find({
      supplierID: req.params.supplierID
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
};
