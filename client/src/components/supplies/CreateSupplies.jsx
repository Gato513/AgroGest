import React from "react";
import SupplieForm from "../forms/SupplieForm";
import { createItem } from "@/app/api/route";

const initialData = {
    supplieName: "",
    category: "",
    supplieType: "",
    quantityAvailable: "",
    unitMeasure: "",
    characteristic: ""
};



const CreateSupplies = ({ addSupplie }) => {
    const createSupplie = async (data) => {
        try {
            const newData = await createItem("supplie", data);
            addSupplie(newData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SupplieForm
            dataSendingHandler={createSupplie}
            initialData={initialData}
            labelButton={"+"}
            labelTitle={"Agregar Insumo Agricola"}
        />
    );
};

export default CreateSupplies;

