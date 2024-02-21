import CropForm from "../forms/CropForm";
import { updateItem } from "@/app/api/route";

const EditeCrop = ({ dataCrop, redefineCreationForm }) => {
    const updateCropProduct = async (data) => {
        try {
            const updatedProduct = await updateItem("crop", data);
            redefineCreationForm(updatedProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CropForm
            dataSendingHandler={updateCropProduct}
            initialData={dataCrop}
            labelButton={"Editar"}
            labelTitle={"Editar Producto"}
        />
    );
};

export default EditeCrop;

