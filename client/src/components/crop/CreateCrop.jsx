import React from "react";
import CropForm from "../forms/CropForm";
import { createItem } from "@/app/api/route";

const initialData = {
	product: "",
	category: "",
	available: "",
	unitMeasure: "",
	sowingDate: "",
	harvestDate: "",
	cultivationMethod: "",
};

const CreateCrop = ({ addCrop }) => {
	const createCrop = async (data) => {
		try {
			const newData = await createItem("crop", data);
			addCrop(newData);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CropForm
			dataSendingHandler={createCrop}
			initialData={initialData}
			labelButton={"+"}
			labelTitle={"Agregar Cultivo"}
		/>
	);
};

export default CreateCrop;
