const Crop = require("../models/crop.model");

//! Crear cultivos para cada user
module.exports.createCrop = async (req, res) => {
    try {
        const userId = req.userId;

        const newCrop = await Crop.create({ ...req.body, id_user: userId });

        res.status(200).json(newCrop);
    } catch (error) {
        res.status(500).json(error); 
    }
};

//! Obtener todos los cultivos para cada Usuario
module.exports.getCropsPerUser = async (req, res) => {
    try {
        const userId = req.userId;
        const crops = await Crop.find({ id_user: userId });

        res.status(200)
        res.json(crops);
    } catch (error) {
        res.status(500)
        res.json(error);
    }
};

//* Obtener un cultivo especifico por su id
module.exports.findCropById = async (req, res) => {
    const { id } = req.params;
    try {
        const crop = await Crop.findOne({ _id: id });
        res.status(200).json(crop);
    } catch (error) {
        res.status(500).json(error)
    }
}

//* Actualizar un cultivo especifico por su id
module.exports.updateCrop = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCrop = await Crop.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedCrop);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Eliminar un cultivo especifico por su id
module.exports.deleteCrop = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCrop = await Crop.deleteOne({ _id: id });
        res.status(200).json(deletedCrop);
    } catch (error) {
        res.status(500).json(error);
    }
};