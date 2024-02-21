const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
    tipoCrop: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Frutas", "Verduras", "Granos"],
    },
    available: {
        type: Number,
        required: true
    },
    unitMeasure: {
        type: String,
        required: true
    },
    sowingDate: {
        type: String,
        required: true
    },
    harvestDate: {
        type: String,
        required: true
    },
    cultivationMethod: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false });

const Crop = mongoose.model("Crop", CropSchema);

module.exports = Crop;
