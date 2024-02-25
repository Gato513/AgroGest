const Product = require("../models/product.model");
const Cattle = require("../models/cattle.model");
const Supplie = require("../models/supplies.model");

//* Grafico general alojado en el Home
module.exports.formattedForCharts = async (req, res) => {
    try {
        const userId = req.userId;

        const product = await Product.find({ id_user: userId });
        const cattle = await Cattle.find({ id_user: userId });
        const supplies = await Supplie.find({ id_user: userId });

        //* Contadores para cada categoría de Pducto
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
        product.forEach(item => {
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
                { value: semillasCount, label: "Agroquímicos" },
                { value: fertilizantesCount, label: "Semillas" },
                { value: agroquímicosCount, label: "Fertilizantes" },
            ],
            generalData: [
                { value: cattle.length, label: "Ganado" },
                { value: product.length, label: "Cultivos" },
                { value: supplies.length, label: "Insumos Agrarios" }
            ]
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

//* Datos para graficas espesificas

//* Grafico de Productos
module.exports.DataProductForChart = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await Product.find({ id_user: userId });

        // Agrupar los productos por su nombre y sumar la cantidad disponible
        const productData = products.reduce((acc, curr) => {
            if (acc[curr.product]) {
                acc[curr.product] += curr.available;
            } else {
                acc[curr.product] = curr.available;
            }
            return acc;
        }, {});

        // Formatear los datos en el formato deseado
        const dataProduct = Object.entries(productData).map(([productName, totalAvailable]) => ({
            value: totalAvailable,
            label: productName
        }));

        // Añadir otros elementos al arreglo dataProduct si es necesario
        dataProduct.push({ value: products.length, label: "Cultivos" });
        // Puedes añadir supplies.length si tienes los datos disponibles en este contexto

        res.status(200).json({ dataProduct });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//* Grafico de cantidad de ganado por raza falta mejorar 
module.exports.DataCattleForChart = async (req, res) => {
    try {
        const userId = req.userId;
        const cattle = await Cattle.find({ id_user: userId });

        // Agrupar el ganado por raza y contar la cantidad
        const cattleData = cattle.reduce((acc, curr) => {
            acc[curr.race] = (acc[curr.race] || 0) + 1;
            return acc;
        }, {});

        // Formatear los datos en el formato deseado
        const dataCattle = Object.entries(cattleData).map(([race, count]) => ({
            value: count,
            label: race
        }));

        // Agregar el total de cabezas de ganado como un elemento en dataCattle
        const totalCattle = cattle.length;
        dataCattle.push({ value: totalCattle, label: "Total de cabezas de ganado" });

        res.status(200).json({ dataCattle });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports.DataSupplieForChart = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await Product.find({ id_user: userId });

        // Agrupar los productos por su nombre y sumar la cantidad disponible
        const productData = products.reduce((acc, curr) => {
            if (acc[curr.product]) {
                acc[curr.product] += curr.available;
            } else {
                acc[curr.product] = curr.available;
            }
            return acc;
        }, {});

        // Formatear los datos en el formato deseado
        const dataProduct = Object.entries(productData).map(([productName, totalAvailable]) => ({
            value: totalAvailable,
            label: productName
        }));

        // Añadir otros elementos al arreglo dataProduct si es necesario
        dataProduct.push({ value: products.length, label: "Cultivos" });
        // Puedes añadir supplies.length si tienes los datos disponibles en este contexto

        res.status(200).json({ dataProduct });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}