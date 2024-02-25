const verifyToken = require("../util/verifyToken");
const express = require('express');
const router = express.Router();

const chartsController = require('../controllers/charts.controller');


/* Rutas de product */
router.get("/generalGraphics", verifyToken, chartsController.formattedForCharts);

router.get("/product", verifyToken, chartsController.DataProductForChart);

router.get("/cattle",  verifyToken, chartsController.DataCattleForChart)

router.get("/supplie",  verifyToken, chartsController.DataSupplieForChart)


module.exports = router;
