const Cattle = require("../models/cattle.model");

//! Crear ganado para cada Usuario
module.exports.createCattle = async (req, res) => {
    try {
        const userId = req.userId;

        const newCattle = await Cattle.create({ ...req.body, id_user: userId });

        res.status(200).json(newCattle);
    } catch (error) {
        res.status(500).json(error); 
    }
};

//! Obtener todos los ganado para cada Usuario
module.exports.getCattlePerUser = async (req, res) => {
    try {
        const userId = req.userId;
        const cattle = await Cattle.find({ id_user: userId });

        res.status(200).json(cattle);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Obtener un ganado especifico por su id
module.exports.findCattleById = async (req, res) => {
    const { id } = req.params;
    try {
        const cattle = await Cattle.findOne({ _id: id });
        res.status(200).json(cattle);
    } catch (error) {
        res.status(500).json(error)
    }
}

//* Actualizar un ganado especifico por su id
module.exports.updateCattle = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCattle = await Cattle.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedCattle);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Eliminar un ganado especifico por su id
module.exports.deleteCattle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCattle = await Cattle.deleteOne({ _id: id });
        res.status(200).json(deletedCattle);
    } catch (error) {
        res.status(500).json(error);
    }
};