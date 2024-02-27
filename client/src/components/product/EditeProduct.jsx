import ProductForm from "../forms/ProductForm";
import { updateItem } from "@/app/api/route";

const EditeProduct = ({ dataProducts, redefineCreationForm }) => {
    const updateProduct = async (data) => {
        try {
            const updateProduct = await updateItem("product", data);
            redefineCreationForm(updateProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductForm
            dataSendingHandler={updateProduct}
            initialData={dataProducts}
            labelButton={"Editar"}
            labelTitle={"Editar Producto"}
        />
    );
};

export default EditeProduct;

