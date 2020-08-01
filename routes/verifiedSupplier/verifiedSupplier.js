const VerifiedSupplier = require("../../models/VerifiedSupplierSchema");

let verifiedSupplier = (module.exports = {});

verifiedSupplier.add = async (req, res, next) => {
  try {
    var supplier = new VerifiedSupplier(req.body);
    const savedSupplier = await supplier.save();
    res.send(savedSupplier);
  } catch (err) {
    next(err);
  }
};
