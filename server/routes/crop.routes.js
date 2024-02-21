const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const cropController = require('../controllers/crop.controller');


/* Rutas de Crop */
router.post("", verifyToken, cropController.createCrop);
router.get("", verifyToken, cropController.getCropsPerUser);

router.get("/:id", cropController.findCropById);
router.put("/:id", cropController.updateCrop);
router.delete("/:id", cropController.deleteCrop);

module.exports = router;
