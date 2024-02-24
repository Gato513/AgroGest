const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const supplieController = require('../controllers/supplie.controller');


//* Rutas de insumos Agrarios
router.post("", verifyToken, supplieController.createSupplie);
router.get("", verifyToken, supplieController.getSuppliesPerUser);

router.get("/:id", supplieController.findSupplieById);
router.put("/:id", supplieController.updateSupplie);
router.delete("/:id", supplieController.deleteSupplie);

module.exports = router;
