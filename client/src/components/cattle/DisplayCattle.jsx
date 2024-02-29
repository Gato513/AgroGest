import React from "react";
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import generateKey from "@/util/generateKey";
import { deleteItem } from "@/app/api/route";

const DisplayCattle = ({ handleFormType, removeFromDom, dataCattleProducts }) => {

	const deleteCattle = async (idToDelete) => {
		try {
			await deleteItem("cattle", idToDelete);
			removeFromDom(idToDelete);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TableContainer component={Paper} sx={{ maxHeight: "53.3vh" }}>
			<Table aria-label="simple table">
				<TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
					<TableRow sx={{ backgroundColor: "white" }}>
						<TableCell align="center">Código</TableCell>
						<TableCell align="center">Categoría</TableCell>
						<TableCell align="center">Raza</TableCell>
						<TableCell align="center">Producción</TableCell>
						<TableCell align="center">Estado de Salud</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{dataCattleProducts.map((item, idx) => {
						const newKey = generateKey(idx);
						return (
							<TableRow key={newKey}>

								<TableCell align="center">
									{item.identificationCode}
								</TableCell>

								<TableCell align="center">
									{item.category}
								</TableCell>

								<TableCell align="center">
									{item.race}
								</TableCell>

								<TableCell align="center">
									{item.quantityProduced} {item.unitOfMeasure}{" "}
									de {item.productionType}{" "}
									{item.productionTime}
								</TableCell>

								<TableCell align="center">
									{item.healthStatus}
								</TableCell>

								<TableCell align="center">
									<Stack
										direction="row"
										spacing={2}
										justifyContent="center"
									>

										<Button
											variant="contained"
											color="info"
											onClick={(e) =>
												handleFormType(item._id)
											}
										>
											Editar
										</Button>

										<Button
											variant="contained"
											color="error"
											onClick={() =>
												deleteCattle(item._id)
											}
										>
											Eliminar
										</Button>
									</Stack>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DisplayCattle;
