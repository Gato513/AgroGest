import React from "react";
import CattleForm from "../forms/CattleForm";
import { createItem } from "@/app/api/route";

const initialData = {
	identificationCode: "",
	category: "",
	race: "",
	productionType: "",
	quantityProduced: "",
	unitOfMeasure: "",
	productionTime: "",
	healthStatus: ""
};

const CreateCattle = ({ addProduct, generateReport }) => {
	const createCattle = async (data) => {
		try {
			const newData = await createItem("cattle", data);
			addProduct(newData);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CattleForm
			dataSendingHandler={createCattle}
			generateReport={generateReport}
			initialData={initialData}
			labelButton={"+"}
			labelTitle={"Agregar Ganado"}
		/>
	);
};

export default CreateCattle;
