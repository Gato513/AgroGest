const Supplie = require("../models/agroSupplie.model");

//! Crear insumos agrarios para cada user
module.exports.createSupplie = async (req, res) => {
    try {
        const userId = req.userId;

        const newSupplie = await Supplie.create({ ...req.body, id_user: userId });

        res.status(200).json(newSupplie);
    } catch (error) {
        res.status(500).json(error); 
    }
};

//! Obtener todos los insumos agrarios para cada Usuario
module.exports.getSuppliesPerUser = async (req, res) => {
    try {
        const userId = req.userId;
    
        const supplies = await Supplie.find({ id_user: userId });

        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Obtener un insumo agrario especifico por su id
module.exports.findSupplieById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplie = await Supplie.findOne({ _id: id });
        res.status(200).json(supplie);
    } catch (error) {
        res.status(500).json(error)
    }
}

//* Actualizar un insumo agrario especifico por su id
module.exports.updateSupplie = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSupplie = await Supplie.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedSupplie);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Eliminar un insumo agrario especifico por su id
module.exports.deleteSupplie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupplie = await Supplie.deleteOne({ _id: id });
        res.status(200).json(deletedSupplie);
    } catch (error) {
        res.status(500).json(error);
    }
};