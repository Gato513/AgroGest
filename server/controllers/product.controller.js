const Product = require("../models/product.model");

//! Crear cultivos para cada user
module.exports.createProduct = async (req, res) => {
    try {
        const userId = req.userId;
        const newProduct = await Product.create({ ...req.body, id_user: userId });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json(error); 
    }
};

//! Obtener todos los cultivos para cada Usuario
module.exports.getProductsPerUser = async (req, res) => {
    try {
        const userId = req.userId;
        const product = await Product.find({ id_user: userId });

        res.status(200)
        res.json(product);
    } catch (error) {
        res.status(500)
        res.json(error);
    }
};

//* Obtener un cultivo especifico por su id
module.exports.findProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ _id: id });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
}

//* Actualizar un cultivo especifico por su id
module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Eliminar un cultivo especifico por su id
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.deleteOne({ _id: id });
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};