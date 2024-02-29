const Product = require("../models/product.model");
const Cattle = require("../models/cattle.model");
const Supplie = require("../models/supplies.model");

const dataDrouper = (data, category) => {
    const group = data.reduce((acc, curr) => {
        if (curr.category === category) {
            if (acc[curr.product]) {
                acc[curr.product] += curr.available;
            } else {
                acc[curr.product] = curr.available;
            }
        }
        return acc;
    }, {});

    return group;
};

const dataFormatting = (data) => {
    const formattedData = Object.entries(data).map(([productName, totalAvailable]) => ({
        value: totalAvailable,
        label: productName
    }));
    return formattedData;
};

module.exports.formattedForCharts = async (req, res) => {
    try {
        const userId = req.userId;

        const [products, cattle, supplies] = await Promise.all([
            Product.find({ id_user: userId }),
            Cattle.find({ id_user: userId }),
            Supplie.find({ id_user: userId })
        ]);

        let frutasCount = 0;
        let verdurasCount = 0;
        let granosCount = 0;

        let lecheroCount = 0;
        let carneCount = 0;
        let lanarCount = 0;
        let caprinoCount = 0;
        let porcinoCount = 0;
        let aveCount = 0;

        let semillasCount = 0;
        let fertilizantesCount = 0;
        let agroquímicosCount = 0;

        products.forEach(item => {
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

        const data = {
            product: [
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
                { value: semillasCount, label: "Semillas" },
                { value: fertilizantesCount, label: "Fertilizantes" },
                { value: agroquímicosCount, label: "Agroquímicos" },
            ],
            generalData: [
                { value: cattle.length, label: "Ganado" },
                { value: products.length, label: "Cultivos" },
                { value: supplies.length, label: "Insumos Agrarios" }
            ]
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.DataProductForChart = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await Product.find({ id_user: userId });

        const fruitData = dataDrouper(products, "Frutas");
        const fruit = dataFormatting(fruitData);

        const vegetablesData = dataDrouper(products, "Verduras");
        const vegetables = dataFormatting(vegetablesData);

        const grainData = dataDrouper(products, "Granos");
        const grain = dataFormatting(grainData);

        res.status(200).json({
            fruit,
            vegetables,
            grain
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.DataCattleForChart = async (req, res) => {
    try {
        const userId = req.userId;
        const cattle = await Cattle.find({ id_user: userId });

        const healthData = cattle.reduce((acc, curr) => {
            acc[curr.healthStatus] = (acc[curr.healthStatus] || 0) + 1;
            return acc;
        }, {});

        const dataHealth = dataFormatting(healthData);

        res.status(200).json(dataHealth);

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.DataSupplieForChart = async (req, res) => {
    try {
        const userId = req.userId;
        const supplies = await Supplie.find({ id_user: userId });

        const characteristicData = supplies.reduce((acc, curr) => {
            acc[curr.characteristic] = (acc[curr.characteristic] || 0) + 1;
            return acc;
        }, {});

        const dataCharacteristic = dataFormatting(characteristicData);

        res.status(200).json(dataCharacteristic);

    } catch (error) {
        res.status(500).json(error);
    }
};