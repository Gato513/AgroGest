"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { getAllItems, bringChartData } from "@/app/api/route";
import CreateProduct from "@/components/product/CreateProduct";
import EditeProduct from "@/components/product/EditeProduct";
import DisplayProduct from "@/components/product/DisplayProduct";

import generatePDF from "@/components/pdfgen/generatePDF";

import PieCharts from "@/components/charts/PieCharts";
import { Paper, Typography } from "@mui/material";

const Product = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneProduct, setDataOneProduct] = useState({});
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	//*Estado de los graficos de productos
	const [chartsData, setChartsData] = useState({});

	const getDataAllCharts = async () => {
		try {
			const chartsData = await bringChartData("product");
			setChartsData(chartsData);
		} catch (error) {
			console.log(error);
		}
	};

	const getDataAllProduct = async () => {
		try {
			const productData = await getAllItems("product");
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

	//* Funciones para modificar el DOM
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

	const handleReportBuilder = () => {
		generatePDF(data);
	};

	return (
		loaded && (
			<Box sx={{ width: "100%" }}>
				<Grid
					container
					rowSpacing={0.5}
					columnSpacing={{ xs: 1, sm: 2, md: 1 }}
				>
					<Grid item xs={4}>
						{isCreateForm ? (
							<CreateProduct
								addProduct={addFromDom}
								generateReport={handleReportBuilder}
							/>
						) : (
							<EditeProduct
								dataProducts={dataOneProduct}
								redefineCreationForm={defineCreationForm}
								generateReport={handleReportBuilder}
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

					{/*//! Graficos */}
					<Grid item xs={4}>
						<Paper sx={styleContainer}>
							<Typography>Frutas</Typography>
							<PieCharts data={chartsData.fruit} />
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper sx={styleContainer}>
							<Typography>Vegetales</Typography>
							<PieCharts data={chartsData.vegetables} />
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper sx={styleContainer}>
							<Typography>Granos</Typography>
							<PieCharts data={chartsData.grain} />
						</Paper>
					</Grid>
				</Grid>
			</Box>
		)
	);
};

export default Product;

const styleContainer = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	backgroundColor: "white",
};
