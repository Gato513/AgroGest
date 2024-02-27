"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllItems } from "@/app/api/route";
import CreateProduct from "@/components/product/CreateProduct";
import EditeProduct from "@/components/product/EditeProduct";
import DisplayProduct from "@/components/product/DisplayProduct";

const Product = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneProduct, setDataOneProduct] = useState({});
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

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
								dataProducts={dataOneProduct}
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

					{/*//* Secciones Agregadas para proyecto Grupal  */}		
					<Grid item xs={2}>
						<Box sx={{backgroundColor: "white", minHeight: "14rem", outline: "1px solid black"}}> {/*//* => Estos estilos deven ser eleiminados */}
							Seccion donde estara el formulario de filtrado
						</Box>
					</Grid>

					<Grid item xs={2}>
						<Box sx={{backgroundColor: "white", minHeight: "14rem", outline: "1px solid black"}}> {/*//* => Estos estilos deven ser eleiminados */}
							Seccion donde estara el boton de generar informe.
						</Box>
					</Grid>
					
					<Grid item xs={8}>
						<Box sx={{backgroundColor: "white", minHeight: "14rem", outline: "1px solid black"}}> {/*//* => Estos estilos deven ser eleiminados */}
							Seccion donde estaran algunos graficos = (grafico porcentual de productos existentes)
						</Box>
					</Grid>

				</Grid>
			</Box>
		)
	);
};

export default Product;
