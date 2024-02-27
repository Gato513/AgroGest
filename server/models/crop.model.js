const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({

    product: {  
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Frutas", "Verduras", "Granos"],
    }, 
    sowingDate: {
        type: String,
        required: true
    },
    cultivationMethod: {
        type: String,
        required: true
    }, 
    id_user: {
        type: String,
    }
}, { timestamps: true, versionKey: false });

const Crop = new mongoose.model("Crop", CropSchema);

module.exports = Crop;

