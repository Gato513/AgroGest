import CropForm from "../forms/CropForm";
import { updateItem } from "@/app/api/route";

const EditeCrop = ({ dataCrop, redefineCreationForm }) => {
    const updateProduct = async (data) => {
        try {
            const updatedData = await updateItem("crop", data);
            redefineCreationForm(updatedData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CropForm
            dataSendingHandler={updateProduct}
            initialData={dataCrop}
            labelButton={"Editar"}
            labelTitle={"Editar Cultivo"}
        />
    );
};

export default EditeCrop;

