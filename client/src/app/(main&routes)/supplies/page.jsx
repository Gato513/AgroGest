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

const Supplie = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneSupplie, setDataOneSupplie] = useState({});
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = "supplie";
				const supplieData = await getAllItems(dataCollection);
				setData(supplieData);
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
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
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 1, md: 1 }}
				>
					<Grid item xs={4}>
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
					<Grid item xs={8}>
						<Box>
							<DisplaySupplies
								handleFormType={defineEditForm}
								removeFromDom={removeFromDom}
								dataSupplie={data}
							/>
						</Box>
					</Grid>

					{/*//! Graficos */}
					<Grid item xs={4}>
						<Paper sx={styleContainer}>
							<Typography>Frutas</Typography>
							{/* <PieCharts data={chartsData.fruit} /> */}
						</Paper>
					</Grid>

					<Grid item xs={4}>
						<Paper sx={styleContainer}>
							<Typography>Vegetales</Typography>
							{/* <PieCharts data={chartsData.vegetables} /> */}
						</Paper>
					</Grid>

					<Grid item xs={4}>
						<Paper sx={styleContainer}>
							<Typography>Granos</Typography>
							{/* <PieCharts data={chartsData.grain} /> */}
						</Paper>
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
