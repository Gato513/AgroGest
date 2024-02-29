"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllItems } from "@/app/api/route";
import CreateSupplies from "@/components/supplies/CreateSupplies";
import DisplaySupplies from "@/components/supplies/DisplaySupplies";
import EditeSupplies from "@/components/supplies/EditeSupplies";
import generatePDF from "@/components/pdfgen/PdfSupplies";


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

	
    const handleGeneratePDF = () => {
        generatePDF(data);
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
							<CreateSupplies addSupplie={addFromDom} />
						) : (
							<EditeSupplies
								dataSupplie={dataOneSupplie}
								redefineCreationForm={defineCreationForm}
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


					{/*//* Secciones Agregadas para proyecto Grupal  */}		
					<Grid item xs={2}>
						<Box sx={{backgroundColor: "white", minHeight: "14rem", outline: "1px solid black"}}> {/*//* => Estos estilos deven ser eleiminados */}
							Seccion donde estara el formulario de filtrado
						</Box>
					</Grid>

					<Grid item xs={2}>
                        <button onClick={handleGeneratePDF}>Generar PDF</button>
                    </Grid>
					
					<Grid item xs={8}>
						<Box sx={{backgroundColor: "white", minHeight: "14rem", outline: "1px solid black"}}> {/*//* => Estos estilos deven ser eleiminados */}
							Seccion donde estaran algunos graficos = (grafico porcentual de caracteristica de unsumo
							cuantos insumos solidos liquidos o granulados existen)
						</Box>
					</Grid>
					
				</Grid>
			</Box>
		)
	);
};

export default Supplie;
