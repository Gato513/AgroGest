"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllItems } from "@/app/api/route";
import CreateCattle from "@/components/cattle/CreateCattle";
import EditeCattle from "@/components/cattle/EditeCattle";
import DisplayCattle from "@/components/cattle/DisplayCattle";

const ProductCattle = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneCattle, setDataOneCattle] = useState({});
	
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = "cattle";
				const cropData = await getAllItems(dataCollection);
				setData(cropData);
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
		setDataOneCattle(filteredProduct);
	};

	const defineCreationForm = (updatedProduct) => {
		updateData(updatedProduct);
		setIsCreateForm(true);
	};

	return (
		loaded && (
			<Box sx={{ width: "100%" }}>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid item xs={4}>
						{isCreateForm ? (
							<CreateCattle addProduct={addFromDom} />
						) : (
							<EditeCattle
								dataCattle={dataOneCattle}
								redefineCreationForm={defineCreationForm}
							/>
						)}
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

export default ProductCattle;
