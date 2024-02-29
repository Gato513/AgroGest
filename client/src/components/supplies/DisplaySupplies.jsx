import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import generateKey from "@/util/generateKey";

import { deleteItem } from "@/app/api/route";

const DisplaySupplies = ({ handleFormType, removeFromDom, dataSupplie }) => {

	const deleteSupplie = async (idToDelete) => {
		try {
			await deleteItem("supplie", idToDelete);
			removeFromDom(idToDelete);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TableContainer component={Paper} sx={{ maxHeight: "88vh" }}>
			<Table aria-label="simple table">
				<TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
					<TableRow sx={{ backgroundColor: "white" }}>
						<TableCell align="center">Producto</TableCell>
						<TableCell align="center">Categoría</TableCell>
						<TableCell align="center">Tipo de Insumo</TableCell>
						<TableCell align="center">Cantidad Disponible</TableCell>
						<TableCell align="center">Característica</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{dataSupplie.map((item, idx) => {
						const newKey = generateKey(idx);
						return (
							<TableRow key={newKey}>
								<TableCell align="center">
									{item.supplieName}
								</TableCell>
								<TableCell align="center">
									{item.category}
								</TableCell>
								<TableCell align="center">
									{item.supplieType}
								</TableCell>
								<TableCell align="center">
									{item.quantityAvailable} {item.unitMeasure}
								</TableCell>
								<TableCell align="center">
									{item.characteristic || "N/A"}
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
												deleteSupplie(item._id)
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

export default DisplaySupplies;
