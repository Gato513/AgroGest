"use client";
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

const CattleForm = ({
	dataSendingHandler,
	initialData,
	labelButton,
	labelTitle,
}) => {
	const [formData, setFormData] = useState(initialData);

	useEffect(() => {
		console.log(initialData);
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
			elevation={1}
			sx={{
				padding: 2,
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
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
					gap: "1rem",
				}}
			>
				<Box sx={{ display: "flex", gap: "1rem" }}>
					<Stack spacing={2} direction="column">
						<TextField
							name="identificationCode"
							label="Codigo de Identificación"
							variant="outlined"
							value={formData.identificationCode}
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
							{[
								"Lechero",
								"Carne",
								"Lanar",
								"Caprino",
								"Porcino",
								"Ave de Corral",
							].map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>

						<TextField
							name="race"
							label="Raza"
							variant="outlined"
							value={formData.race}
							onChange={handleChange}
							fullWidth
						/>

						<TextField
							name="healthStatus"
							select
							label="Estado de Salud"
							variant="outlined"
							value={formData.healthStatus}
							onChange={handleChange}
							fullWidth
						>
							{["Bueno", "Malo", "Pesimo"].map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Stack>

					<Stack spacing={2} direction="column">
						<TextField
							name="productionType"
							label="Tipo de Producción"
							variant="outlined"
							value={formData.productionType}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name="unitOfMeasure"
							select
							label="Unidad de Medida"
							variant="outlined"
							value={formData.unitOfMeasure}
							onChange={handleChange}
							fullWidth
						>
							{["Kilos", "Gramos", "Litros", "Mililitros"].map(
								(option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								)
							)}
						</TextField>

						<TextField
							name="productionTime"
							select
							label="Tiempo de Producción"
							variant="outlined"
							value={formData.productionTime}
							onChange={handleChange}
							fullWidth
						>
							{[
								"Diarios",
								"Semanales",
								"Mensuales",
								"Anuales",
							].map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>

						<TextField
							name="quantityProduced"
							label="Cantidad Producida"
							variant="outlined"
							type="number"
							value={formData.quantityProduced}
							onChange={handleChange}
							fullWidth
						/>
					</Stack>
				</Box>
				<Box>
					<Button type="submit" variant="contained" color="primary">
						{labelButton}
					</Button>
				</Box>
			</form>
		</Paper>
	);
};

export default CattleForm;
