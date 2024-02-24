const mongoose = require("mongoose");

const AgroSupplieSchema = new mongoose.Schema({

    supplieName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Semillas", "Fertilizantes", "Agroquímicos"],
    },
    supplieType: {
        type: String,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    unitMeasure: {
        type: String,
        required: true
    },
    characteristic: {
        type: String,
        enum: ["Solido", "Liquido", "Granulado", "Otros"]
    },
    id_user: {
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false });

const AgroSupplie = new mongoose.model("AgroSupplie", AgroSupplieSchema);

module.exports = AgroSupplie;


