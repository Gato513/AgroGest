"use client";
import { deleteItem } from "@/app/api/route";
import { getItemsById } from "@/app/api/route";
import { createItem } from "@/app/api/route";

import { Box, Container, CssBaseline } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/forms/ProductForm";
import { useEffect, useState } from "react";

const harvest = () => {
	const router = useRouter();
	const { id } = useParams();

	const [dataCrop, setDataCrop] = useState({});
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cropData = await getItemsById("crop", id);
				setDataCrop(() => {
					return {
						...cropData,
						unitMeasure: "",
						harvestDate: "",
						available: "",
					};
				});
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const deleteCrop = async () => {
		try {
			const deleteinfo = await deleteItem("crop", id);
		} catch (error) {
			console.log(error);
		}
	};

	const createProduct = async (data) => {
		try {
			const newData = await createItem("product", data);
			deleteCrop();
			router.push("/current_crop");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{loaded && (
						<ProductForm
							dataSendingHandler={createProduct}
							initialData={dataCrop}
							labelButton={"Cosechar"}
							labelTitle={"Cosechar Producto"}
						/>
					)}
				</Box>
			</Container>
		</>
	);
};

export default harvest;
