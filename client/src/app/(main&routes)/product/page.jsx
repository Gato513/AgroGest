"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { getAllItems, bringChartData } from "@/app/api/route";
import CreateProduct from "@/components/product/CreateProduct";
import EditeProduct from "@/components/product/EditeProduct";
import DisplayProduct from "@/components/product/DisplayProduct";
import generatePDF from "@/components/pdfgen/PdfProduct";
import PieCharts from "@/components/charts/PieCharts";

const Product = () => {
    const [isCreateForm, setIsCreateForm] = useState(true);
    const [dataOneProduct, setDataOneProduct] = useState({});
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [productChartData, setProductChartData] = useState([]);
    const [fruitChartData, setFruitChartData] = useState([]);
    const [vegetableChartData, setVegetableChartData] = useState([]);
    const [grainChartData, setGrainChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataCollection = "product";
                const productData = await getAllItems(dataCollection);
                setData(productData);
                setLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchProductChartData = async () => {
            try {
                const chartData = await bringChartData("product");
                setProductChartData(chartData.dataProduct);
            } catch (error) {
                console.error("Error fetching product chart data:", error);
            }
        };
        fetchProductChartData();
    }, []);

    useEffect(() => {
        const fetchFruitChartData = async () => {
            try {
                const chartData = await bringChartData("Frutas");
                setFruitChartData(chartData.dataFruit);
            } catch (error) {
                console.error("Error fetching fruit chart data:", error);
            }
        };
        fetchFruitChartData();
    }, []);

    useEffect(() => {
        const fetchVegetableChartData = async () => {
            try {
                const chartData = await bringChartData("Verduras");
                setVegetableChartData(chartData.dataVegetable);
            } catch (error) {
                console.error("Error fetching vegetable chart data:", error);
            }
        };
        fetchVegetableChartData();
    }, []);

    useEffect(() => {
        const fetchGrainChartData = async () => {
            try {
                const chartData = await bringChartData("Granos");
                setGrainChartData(chartData.dataGrain);
            } catch (error) {
                console.error("Error fetching grain chart data:", error);
            }
        };
        fetchGrainChartData();
    }, []);

    const removeFromDom = (itemId) => {
        setData((prevData) => prevData.filter((item) => item._id !== itemId));
    };

    const addFromDom = (newData) => {
        setData((prevData) => [...prevData, newData]);
    };

    const updateData = (updatedProduct) => {
        setData((prevData) =>
            prevData.map((item) =>
                item._id === updatedProduct._id ? updatedProduct : item
            )
        );
    };

    const filterProductById = (id) => {
        return data.find((item) => item._id === id);
    };

    const defineEditForm = (id) => {
        setIsCreateForm(false);
        const filteredProduct = filterProductById(id);
        setDataOneProduct(filteredProduct);
    };

    const defineCreationForm = (updatedProduct) => {
        updateData(updatedProduct);
        setIsCreateForm(true);
    };

    const handleGeneratePDF = () => {
        generatePDF(data);
    };

    return (
        loaded && (
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                >
                    <Grid item xs={4}>
                        {isCreateForm ? (
                            <CreateProduct addProduct={addFromDom} />
                        ) : (
                            <EditeProduct
                                dataProduct={dataOneProduct}
                                redefineCreationForm={defineCreationForm}
                            />
                        )}
                    </Grid>
                    <Grid item xs={8}>
                        <Box>
                            <DisplayProduct
                                handleFormType={defineEditForm}
                                removeFromDom={removeFromDom}
                                dataProducts={data}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <button onClick={handleGeneratePDF}>Generar PDF</button>
                    </Grid>
                    <Grid item xs={12}>
                        <PieCharts data={productChartData} />
                    </Grid>
                    <Grid item xs={12}>
                        <PieCharts data={fruitChartData} />
                    </Grid>
                    <Grid item xs={12}>
                        <PieCharts data={vegetableChartData} />
                    </Grid>
                    <Grid item xs={12}>
                        <PieCharts data={grainChartData} />
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default Product;
