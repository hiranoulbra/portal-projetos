'use client';
import { lockOrUnlockUser } from "@/actions/users.actions";
import { DeleteDialog } from "@/components/dialogs/delete.dialog.";
import { DeleteActionType } from "@/types/delete-action.type";
import { LockActionType } from "@/types/lock-action.type";
import DeleteIcon from "@/utils/icons/delete.icon";
import LockIcon from "@/utils/icons/lock.icons";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";



const initialState = {
    message: null
}
type DeleteFormProps = {
    id: number;


    isLocked: boolean;
}
export const LockForm = ({ id, isLocked }: DeleteFormProps) => {
    const [showModal, setShowModal] = useState(false);
    const [state, formAction] = useFormState(lockOrUnlockUser, initialState);
    useEffect(() => {
        state?.message === "success" && setShowModal(false);
      

    }, [state])

    return <div>
        <a onClick={() => setShowModal(true)}><LockIcon isLocked={isLocked} className="cursor-pointer" /></a>
        {showModal && <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="is_locked" value={isLocked ? 'false' : 'true'} />
            <DeleteDialog buttonText={isLocked ? "Desbloquar" : "Bloquear"} buttonClassName={isLocked ? "bg-cyan-900 hover:bg-cyan-800" : undefined} title={isLocked ? 'Desbloquear' : 'Bloquear'} text={isLocked ? "Deseja desbloquear este usuário?" : "Deseja bloquear este usuário?"} onCancel={() => setShowModal(false)} />
        </form>}
    </div >
}
