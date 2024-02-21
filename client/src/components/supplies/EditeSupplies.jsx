import SupplieForm from "../forms/SupplieForm";
import { updateItem } from "@/app/api/route";

const EditeSupplies = ({ dataSupplie, redefineCreationForm }) => {
    const updateCropProduct = async (data) => {
        try {
            const updatedProduct = await updateItem("supplie", data);
            redefineCreationForm(updatedProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SupplieForm
            dataSendingHandler={updateCropProduct}
            initialData={dataSupplie}
            labelButton={"Editar"}
            labelTitle={"Editar Insumo Agrario"}
        />
    );
};

export default EditeSupplies;

