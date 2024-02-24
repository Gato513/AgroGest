import ProductForm from "../forms/ProductForm";
import { updateItem } from "@/app/api/route";

const EditeProduct = ({ dataProduct, redefineCreationForm }) => {
    const updateProduct = async (data) => {
        try {
            const updatedProduct = await updateItem("product", data);
            redefineCreationForm(updatedProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductForm
            dataSendingHandler={updateProduct}
            initialData={dataProduct}
            labelButton={"Editar"}
            labelTitle={"Editar Producto"}
        />
    );
};

export default EditeProduct;

