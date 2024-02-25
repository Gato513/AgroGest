const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product: {
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

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
