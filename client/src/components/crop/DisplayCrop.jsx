"use client"
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import generateKey from "@/util/generateKey";

import { useRouter } from "next/navigation";

const DisplayCrop = ({ handleFormType, dataCrop }) => {

	const router = useRouter();

	const harvestProduct = async (idToDelete) => {
		router.push(`harvest/${idToDelete}`);
	};

	return (
		<TableContainer component={Paper} sx={{ maxHeight: "83.3vh" }}>
			<Table aria-label="simple table">
				<TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
					<TableRow sx={{ backgroundColor: "white" }}>
						<TableCell align="center">Cultivo</TableCell>
						<TableCell align="center">Tipo de Cultivo</TableCell>
						<TableCell align="center">Método de Cultivo</TableCell>
						<TableCell align="center">Fecha de Siembra</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{dataCrop.map((item, idx) => {
						const newKey = generateKey(idx);
						return (
							<TableRow key={newKey}>
								<TableCell align="center">
									{item.product}
								</TableCell>
								<TableCell align="center">
									{item.category}
								</TableCell>
								
								<TableCell align="center">
									{item.cultivationMethod}
								</TableCell>
								<TableCell align="center">
									{item.sowingDate}
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
											color="success"
											onClick={() => harvestProduct(item._id)}
										>
											Cosechar
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

export default DisplayCrop;
