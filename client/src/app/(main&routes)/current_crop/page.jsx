"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllItems } from "@/app/api/route";

import CreateCrop from "@/components/crop/CreateCrop";
import EditeCrop from "@/components/crop/EditeCrop";
import DisplayCrop from "@/components/crop/DisplayCrop";

const CultivosActuales = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneProduct, setDataOneProduct] = useState({});
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = "crop";
				const productData = await getAllItems(dataCollection);
				setData(productData);
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);


	const addFromDom = (newData) => {
		setData((prevData) => [...prevData, newData]);
	};

	const updateData = (updatedCrop) => {
		setData((prevData) =>
			prevData.map((item) =>
				item._id === updatedCrop._id ? updatedCrop : item
			)
		);
	};

	const filterCropById = (id) => {
		return data.find((item) => item._id === id);
	};

	const defineEditForm = (id) => {
		setIsCreateForm(false);
		const filteredProduct = filterCropById(id);
		setDataOneProduct(filteredProduct);
	};

	const defineCreationForm = (updatedCrop) => {
		updateData(updatedCrop);
		setIsCreateForm(true);
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
							<CreateCrop addCrop={addFromDom} />
						) : (
							<EditeCrop
								dataCrop={dataOneProduct}
								redefineCreationForm={defineCreationForm}
							/>
						)}
					</Grid>
					<Grid item xs={8}>
						<Box>
							<DisplayCrop
								handleFormType={defineEditForm}
								dataCrop={data}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		)
	);
};

export default CultivosActuales;


