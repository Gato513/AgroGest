import CattleForm from "../forms/CattleForm";
import { updateItem } from "@/app/api/route";

const EditeCattle = ({ dataCattle, redefineCreationForm }) => {
    const updateCattle = async (data) => {
        try {
            const updatedCattle = await updateItem("cattle", data);
            redefineCreationForm(updatedCattle);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CattleForm
            dataSendingHandler={updateCattle}
            initialData={dataCattle}
            labelButton={"Editar"}
            labelTitle={"Editar Ganado"}
        />
    );
};

export default EditeCattle;



