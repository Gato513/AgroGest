const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const cattleController = require('../controllers/cattle.controller');


//* Rutas de ganado
router.post("", verifyToken, cattleController.createCattle);
router.get("", verifyToken, cattleController.getCattlePerUser);

router.get("/:id", cattleController.findCattleById);
router.put("/:id", cattleController.updateCattle);
router.delete("/:id", cattleController.deleteCattle);

module.exports = router;
