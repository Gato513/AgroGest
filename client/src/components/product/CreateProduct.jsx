import React from "react";
import ProductForm from "../forms/ProductForm";
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

const CreateProduct = ({ addProduct }) => {
    const createCropProduct = async (data) => {
        try {
            const newData = await createItem("crop", data);
            addProduct(newData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductForm
            dataSendingHandler={createCropProduct}
            initialData={initialData}
            labelButton={"+"}
            labelTitle={"Agregar Producto"}
        />
    );
};

export default CreateProduct;

