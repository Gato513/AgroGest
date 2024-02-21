const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Recuperacion Password */
router.get("/passwordReset", userController.passwordResetToken);
router.patch("/passwordReset", userController.passwordReset);


/* Rutas Basicas del CRUD */
router.post("", userController.createUser);
router.get("/:id", authenticate, userController.findUser);



module.exports = router;