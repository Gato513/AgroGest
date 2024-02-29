"use client"
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import CreateCattle from "@/components/cattle/CreateCattle";
import EditeCattle from "@/components/cattle/EditeCattle";
import DisplayCattle from "@/components/cattle/DisplayCattle";
import PieCharts from "@/components/charts/PieCharts";
import { getAllItems, bringChartData } from "@/app/api/route";

import generateCattlePDF from "@/components/pdfgen/PdfCatte";

const ProductCattle = () => {
    const [isCreateForm, setIsCreateForm] = useState(true);
    const [dataOneCattle, setDataOneCattle] = useState({});
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    const [chartsData, setChartsData] = useState({});

    const getDataAllCharts = async () => {
		try {
			const chartsData = await bringChartData("cattle");
			setChartsData(chartsData);
		} catch (error) {
			console.log(error);
		}
	};

	const getDataAllProduct = async () => {
		try {
			const productData = await getAllItems("cattle");
			setData(productData);
			setLoaded(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataAllCharts();
		getDataAllProduct();
	}, []);
	useEffect(() => {
		getDataAllCharts();
	}, [data]);


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
        setDataOneCattle(filteredProduct);
    };

    const defineCreationForm = (updatedProduct) => {
        updateData(updatedProduct);
        setIsCreateForm(true);
    };

    const handleReportBuilder = () => {
        generateCattlePDF(data);
    };

    return (
        loaded && (
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={4}>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={12}>
                                {isCreateForm ? (
                                    <CreateCattle
                                        addProduct={addFromDom}
                                        generateReport={handleReportBuilder}
                                    />
                                ) : (
                                    <EditeCattle
                                        dataCattle={dataOneCattle}
                                        redefineCreationForm={defineCreationForm}
                                    />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Paper sx={styleContainer}>
                                    <Typography>Salud General</Typography>
                                    <PieCharts data={chartsData} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Box>
                            <DisplayCattle
                                handleFormType={defineEditForm}
                                removeFromDom={removeFromDom}
                                dataCattleProducts={data}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

const styleContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
};

export default ProductCattle;

