import React from "react";
import ProductForm from "../forms/ProductForm";
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

const CreateProduct = ({ addProduct }) => {
    const createProduct = async (data) => {
        try {
            const newData = await createItem("product", data);
            addProduct(newData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductForm
            dataSendingHandler={createProduct}
            initialData={initialData}
            labelButton={"+"}
            labelTitle={"Agregar Producto"}
        />
    );
};

export default CreateProduct;

