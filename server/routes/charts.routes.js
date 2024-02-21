const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const chartsController = require('../controllers/charts.controller');


/* Rutas de Crop */
router.get("/crop", verifyToken, chartsController.formattedForCharts);

router.get("", verifyToken, chartsController.formattedForCharts);


module.exports = router;
