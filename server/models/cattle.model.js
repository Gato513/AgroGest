const mongoose = require("mongoose");

const CattleSchema = new mongoose.Schema({

    identificationCode: {
        type: String,
        required: true,
        unique: [true, "El valor introducido ya esta en uso."]
    },
    category: {
        type: String,
        required: true,
        enum: ["Lechero", "Carne", "Lanar", "Caprino", "Porcino", "Ave de Corral"],
    },
    race: {
        type: String,
        required: true,
    },

    productionType: {
        type: String,
        required: true
    },
    quantityProduced: {
        type: Number,
        required: true
    },
    unitOfMeasure: {
        type: String,
        required: true
    },
    productionTime: {
        type: String,
        required: true
    },

    healthStatus: {
        type: String,
        required: true,
        enum: ["Bueno", "Malo", "Pesimo"]
    },
    id_user: {
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false });

const Cattle = new mongoose.model("Cattle", CattleSchema);

module.exports = Cattle;