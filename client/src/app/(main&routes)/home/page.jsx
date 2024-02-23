"use client";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PieCharts from "@/components/charts/PieCharts";
import Link from "next/link";
import generateKey from "@/util/generateKey";
import { getAllDataforCharts } from "@/app/api/route";

const categories = [
	{
		label: "Productos Por Categoria",
		href: "/product_crop",
		indexData: "crops",
	},
	{
		label: "Ganado",
		href: "/cattle",
		indexData: "cattle",
	},
	{
		label: "Insumos Agrícolas",
		href: "/supplies",
		indexData: "supplies",
	},
	{
		label: "Inventario Completo",
		href: "#",
		indexData: "generalData",
	},
];

const Home = () => {
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllDataforCharts();
				setData(data);
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const renderCategory = (category, newKey) => (
		<Grid key={newKey} item xs={12} sm={6} md={6}>
			<Container sx={styles.container}>
				<Link href={category.href}>
					<Typography sx={styles.typography}>
						{category.label}
					</Typography>
				</Link>
				<PieCharts data={data[category.indexData]} />
			</Container>
		</Grid>
	);

	return (
		loaded && (
			<Box sx={{ width: "100%" }}>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 1 }}
				>
					{categories.map((category, idx) => {
						const newKey = generateKey(idx);
						return renderCategory(category, newKey);
					})}
				</Grid>
			</Box>
		)
	);
};

export default Home;

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "1rem",
		border: "1px solid black",
		borderRadius: "1rem",
		backgroundColor: "white",
	},
	typography: {
		fontSize: "1.2rem",
		color: "blue",
	},
};