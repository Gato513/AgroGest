const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');


/* Rutas de product */
router.post("", verifyToken, productController.createProduct);
router.get("", verifyToken, productController.getProductsPerUser);

router.get("/:id", productController.findProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
