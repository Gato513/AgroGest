"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";
import { logout } from "@/app/api/route";
import generateKey from "@/util/generateKey";

const linkData = [
	{ label: "Home", href: "/home" },
	{ label: "Productos", href: "/product_crop" },
	{ label: "Ganados", href: "/cattle" },
	{ label: "Insumos Agrícolas", href: "/supplies" },
	{ label: "Cultivos", href: "/current_crop" },
	{ label: "Terreno", href: "/terrain_information" },
];

const handleLogout = async (router) => {
	try {
		await logout();
		router.push("/login");
	} catch (error) {
		console.log(error);
	}
};

const renderLink = (data, newKey) => (
	<Typography variant="h6" component="div" key={newKey}>
		<Link
			href={data.href}
			style={{
				color: "white",
				textDecoration: "none",
			}}
		>
			{data.label}
		</Link>
	</Typography>
);

const TopNav = () => {
	const router = useRouter();

	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Container sx={{ display: "flex", gap: 10 }}>
						{linkData.map((data, idx) => {
							const newKey = generateKey(idx);
							return renderLink(data, newKey);
						})}
					</Container>

					<Button
						variant="contained"
						color="secondary"
						onClick={() => handleLogout(router)}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default TopNav;
