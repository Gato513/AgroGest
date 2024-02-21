import React from "react";
import CropForm from "../forms/CropForm";
import { createItem } from "@/app/api/route";

const initialData = {
    tipoCrop: "",
    category: "",
    available: "",
    unitMeasure: "",
    sowingDate: "",
    harvestDate: "",
    cultivationMethod: "",
};

const CreateCrop = ({ addProduct }) => {
    const createCropProduct = async (data) => {
        try {
            const newData = await createItem("crop", data);
            addProduct(newData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CropForm
            dataSendingHandler={createCropProduct}
            initialData={initialData}
            labelButton={"+"}
            labelTitle={"Agregar Producto"}
        />
    );
};

export default CreateCrop;

