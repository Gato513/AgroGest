"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllItems } from "@/app/api/route";
import CreateSupplies from "@/components/supplies/CreateSupplies";
import DisplaySupplies from "@/components/supplies/DisplaySupplies";
import EditeSupplies from "@/components/supplies/EditeSupplies";
import { Paper, Typography } from "@mui/material";

import generateSuppliesPDF from "@/components/pdfgen/PdfSupplies";

import { bringChartData } from "@/app/api/route";
import PieCharts from "@/components/charts/PieCharts";

const Supplie = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneSupplie, setDataOneSupplie] = useState({});
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const [chartsData, setChartsData] = useState({});

	const getDataAllCharts = async () => {
		try {
			const chartsData = await bringChartData("supplie");
			setChartsData(chartsData);
		} catch (error) {
			console.log(error);
		}
	};

	const getDataAllProduct = async () => {
		try {
			const productData = await getAllItems("supplie");
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
		setDataOneSupplie(filteredProduct);
	};

	const defineCreationForm = (updatedProduct) => {
		updateData(updatedProduct);
		setIsCreateForm(true);
	};

	const handleReportBuilder = () => {
		generateSuppliesPDF(data);
	};


	return (
		loaded && (
			<Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={4}>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={12}>
							{isCreateForm ? (
							<CreateSupplies
								addSupplie={addFromDom}
								generateReport={handleReportBuilder}
							/>
						) : (
							<EditeSupplies
								dataSupplie={dataOneSupplie}
								redefineCreationForm={defineCreationForm}
								generateReport={handleReportBuilder}
							/>
						)}
                            </Grid>

                            <Grid item xs={12}>
                                <Paper sx={styleContainer}>
                                    <Typography>Caracteristicas</Typography>
                                    <PieCharts data={chartsData} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Box>
						<DisplaySupplies
								handleFormType={defineEditForm}
								removeFromDom={removeFromDom}
								dataSupplie={data}
							/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
		)
	);
};

export default Supplie;

const styleContainer = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	backgroundColor: "white",
};
