"use client";
import { MapContainer, TileLayer, Polygon, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const Mapa = ({ coordinates }) => {
  
	const [isClient, setIsClient] = useState(false);
	const polygon = coordinates;

	useEffect(() => {
		setIsClient(typeof window !== "undefined");
	}, []);

	const [mapState, setMapState] = useState({
		lat: -23.4425,
		lng: -58.4438,
		zoom: 6,
	});

	const position = [mapState.lat, mapState.lng];

	return (
		<div className="mapa">
			{isClient && (
				<MapContainer
					center={position}
					zoom={mapState.zoom}
					style={{ height: "400px", width: "100%" }}
				>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Polygon color="purple" positions={polygon} />{" "}
					{/* Asegúrate de actualizar o remover si no es relevante */}
					D
				</MapContainer>
			)}
		</div>
	);
};

export default Mapa;
