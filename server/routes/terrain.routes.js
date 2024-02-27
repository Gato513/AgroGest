const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const terrainController = require('../controllers/terrain.controller');


//* Rutas de Terrenos
router.post("", verifyToken, terrainController.createTerrain);
router.get("", verifyToken, terrainController.getAllTerrain);

router.get("/:id", terrainController.getTerrainById);
router.put("/:id", terrainController.updateTerrainById);
router.delete("/:id", terrainController.deleteTerrainById);

module.exports = router;
