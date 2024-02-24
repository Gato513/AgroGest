const mongoose = require("mongoose");

const TerrainSchema = new mongoose.Schema({

    areaTerrain: {
        type: String,
        required: true
    },
    
    id_user: {
        type: String,
    }
}, { timestamps: true, versionKey: false });

const Terrain = new mongoose.model("Terrain", TerrainSchema);

module.exports = Terrain;
