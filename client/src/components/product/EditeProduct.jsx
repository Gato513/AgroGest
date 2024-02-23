import ProductForm from "../forms/ProductForm";
import { updateItem } from "@/app/api/route";

const EditeProduct = ({ dataCrop, redefineCreationForm }) => {
    const updateCropProduct = async (data) => {
        try {
            const updatedProduct = await updateItem("crop", data);
            redefineCreationForm(updatedProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductForm
            dataSendingHandler={updateCropProduct}
            initialData={dataCrop}
            labelButton={"Editar"}
            labelTitle={"Editar Producto"}
        />
    );
};

export default EditeProduct;

