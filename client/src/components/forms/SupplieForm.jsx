"use client";
import {
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
	MenuItem,
	Box,
} from "@mui/material";
import { useEffect, useState } from "react";

const SupplieForm = ({ dataSendingHandler, generateReport, initialData, labelButton, labelTitle }) => {
	const [formData, setFormData] = useState(initialData);

	useEffect(() => {
		setFormData(initialData);
	}, [initialData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dataSendingHandler(formData);
		setFormData(initialData);
	};

	return (
		<Paper
			elevation={2}
			sx={{
				padding: 2,
				display: "flex",
				flexDirection: "column",
				gap: "1.5rem",
			}}
		>
			<Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
				{labelTitle}
			</Typography>
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "2rem",
				}}
			>
				<Box sx={{display: "flex", gap: 1}}>

				{/* //* Modificacion distribucion del formulario de insumos agrarios  */}
					<Stack spacing={2} direction="column" gap={2} >
						<TextField
							name="supplieName"
							label="Nombre del Insumo"
							variant="outlined"
							value={formData.supplieName}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name="category"
							select
							label="Categoría"
							variant="outlined"
							value={formData.category}
							onChange={handleChange}
							fullWidth
						>
							{["Semillas", "Fertilizantes", "Agroquímicos"].map(
								(option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								)
							)}
						</TextField>
						<TextField
							name="supplieType"
							label="Tipo de Insumo"
							variant="outlined"
							value={formData.supplieType}
							onChange={handleChange}
							fullWidth
						/>
					</Stack>

					<Stack spacing={2} direction="column" gap={2} >
						<TextField
							name="quantityAvailable"
							label="Cantidad Disponible"
							variant="outlined"
							type="number"
							value={formData.quantityAvailable}
							onChange={handleChange}
							fullWidth
						/>

						<TextField
							name="unitMeasure"
							select
							label="Unidad de Medida"
							variant="outlined"
							value={formData.unitMeasure}
							onChange={handleChange}
							fullWidth
						>
							{[
								"Kilogramos",
								"Gramos",
								"Litros",
								"Mililitros",
							].map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>

						<TextField
							name="characteristic"
							select
							label="Característica"
							variant="outlined"
							value={formData.characteristic}
							onChange={handleChange}
							fullWidth
						>
							{["Solido", "Liquido", "Granulado", "Otros"].map(
								(option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								)
							)}
						</TextField>
					</Stack>

				</Box>

				<Box sx={{display: "flex", gap: 2}}>
					<Button type="submit" variant="contained" color="primary">
						{labelButton}
					</Button>

					<Button variant="contained" color="success" onClick={generateReport}>
						Generar PDF
					</Button>
				</Box>
				
			</form>
		</Paper>
	);
};

export default SupplieForm;
