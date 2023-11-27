'use client';
import { DeleteDialog } from "@/components/dialogs/delete.dialog.";
import { DeleteActionType } from "@/types/delete-action.type";
import DeleteIcon from "@/utils/icons/delete.icon";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";



const initialState = {
    message: null
}
type DeleteFormProps = {
    id: number;
    title: string;
    text: string;
    action: DeleteActionType;
}
export const DeleteForm = ({ id, title, text, action }: DeleteFormProps) => {
    const [showModal, setShowModal] = useState(false);
    const [state, formAction] = useFormState(action, initialState);
    useEffect(() => {
        state?.message === "success" && setShowModal(false);
  

    }, [state])

    return <div>
        <a onClick={() => setShowModal(true)}><DeleteIcon className="text-red-900 cursor-pointer" /></a>
        {showModal && <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <DeleteDialog title={title} text={text} onCancel={() => setShowModal(false)} />
        </form>}
    </div >
}
