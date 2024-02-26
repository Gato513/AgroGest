const Terrain = require('../models/terrain.model');

//! Controlador para crear un nuevo terreno para el usuario
module.exports.createTerrain = async (req, res) => {
    try {
        const userId = req.userId;
        const terrain = await Terrain.create({ ...req.body, id_user: userId });

        res.status(201).json(terrain);
    } catch (error) {
        res.status(500).json(error);
    }
};


//! Controlador para obtener todos los terrenos
module.exports.getAllTerrain = async (req, res) => {
    try {
        const userId = req.userId;
        const terrain = await Terrain.find({ id_user: userId });

        res.status(200)
        res.json(terrain);
    } catch (error) {
        res.status(500)
        res.json(error);
    }
};


//* Controlador para obtener un terreno por su ID
module.exports.getTerrainById = async (req, res) => {
    const { id } = req.params;
    try {
        const terrain = await Terrain.findOne({ _id: id });
        if (!terrain) {
            return res.status(404).json({ success: false, message: 'Terrain not found' });
        }
        res.status(200).json(terrain);
    } catch (error) {
        res.status(500).json(error)
    }
};


//* Controlador para actualizar un terreno por su ID
module.exports.updateTerrainById = async (req, res) => {

    const { id } = req.params;
    try {
        const terrain = await Terrain.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!terrain) {
            return res.status(404).json({ success: false, message: 'Terrain not found' });
        }
        res.status(200).json(terrain);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Controlador para eliminar un terreno por su ID
module.exports.deleteTerrainById = async (req, res) => {

    const { id } = req.params;
    try {
        const terrain = await Terrain.deleteOne({ _id: id });
        if (!terrain) {
            return res.status(404).json({ success: false, message: 'Terrain not found' });
        }
        res.status(200).json(terrain);
    } catch (error) {
        res.status(500).json(error);
    }
};