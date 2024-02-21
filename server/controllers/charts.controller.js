const Crop = require("../models/crop.model");
const Supplie = require("../models/agroSupplie.model");
const Cattle = require("../models/cattle.model");

module.exports.formattedForCharts = async (req, res) => {
    try {
        const userId = req.userId;

        const crops = await Crop.find({ id_user: userId });
        const cattle = await Cattle.find({ id_user: userId });
        const supplies = await Supplie.find({ id_user: userId });

        //* Contadores para cada categoría de cultivos
        let frutasCount = 0;
        let verdurasCount = 0;
        let granosCount = 0;

        //* Contadores para cada categoría de ganado
        let lecheroCount = 0
        let carneCount = 0
        let lanarCount = 0
        let caprinoCount = 0
        let porcinoCount = 0
        let aveCount = 0

        //* Contadores para cada categoría de Insumos Agrarios
        let semillasCount = 0
        let fertilizantesCount = 0
        let agroquímicosCount = 0

        //! Iterar sobre los cultivos y contar la cantidad en cada categoría
        crops.forEach(item => {
            switch (item.category) {
                case "Frutas":
                    frutasCount++;
                    break;
                case "Verduras":
                    verdurasCount++;
                    break;
                case "Granos":
                    granosCount++;
                    break;
                default:
                    break;
            }
        });

        //! Iterar sobre los ganados y contar la cantidad en cada categoría
        cattle.forEach(item => {
            switch (item.category) {
                case "Lechero":
                    lecheroCount++;
                    break;
                case "Carne":
                    carneCount++;
                    break;
                case "Lanar":
                    lanarCount++;
                    break;
                case "Caprino":
                    caprinoCount++;
                    break;
                case "Porcino":
                    porcinoCount++;
                    break;
                case "Ave de Corral":
                    aveCount++;
                    break;

                default:
                    break;
            }
        });

        //! Iterar sobre los insumos agrarios y contar la cantidad en cada categoría
        supplies.forEach(item => {
            switch (item.category) {
                case "Semillas":
                    semillasCount++;
                    break;
                case "Fertilizantes":
                    fertilizantesCount++;
                    break;
                case "Agroquímicos":
                    agroquímicosCount++;
                    break;
                default:
                    break;
            }
        });

        //? Construir el objeto de datos formateado para los gráficos
        const data = {
            crops: [
                { value: frutasCount, label: "Frutas" },
                { value: verdurasCount, label: "Verduras" },
                { value: granosCount, label: "Granos" }
            ],
            cattle: [
                { value: lecheroCount, label: "Lechero" },
                { value: carneCount, label: "Carne" },
                { value: lanarCount, label: "Lanar" },
                { value: caprinoCount, label: "Caprino" },
                { value: porcinoCount, label: "Porcino" },
                { value: aveCount, label: "Aves de Corral" },
            ],
            supplies: [
                { value: semillasCount, label: "Agroquímicos" },
                { value: fertilizantesCount, label: "Semillas" },
                { value: agroquímicosCount, label: "Fertilizantes" },
            ],
            generalData: [
                { value: cattle.length, label: "Ganado" },
                { value: crops.length, label: "Cultivos" },
                { value: supplies.length, label: "Insumos Agrarios" }
            ]
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};