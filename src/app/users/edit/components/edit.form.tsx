'use client';
import { SecondaryButton } from "@/components/ui/buttons";
import { submitProject } from "@/actions/project.actions";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { User } from "next-auth";
import { FieldText } from "@/components/fields/field.text";
import { FieldSelect } from "@/components/fields/field.select";
import { addOrUpdateUser } from "@/actions/users.actions";
import { SuccessDialog } from "@/components/dialogs/success.dialog.";
import { AlertError } from "@/components/alert.error";




type EditFormProps = {
    user: User;
}

const initialState = {
    message: null
}



const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <button type="submit" className="bg-cyan-900 hover:bg-cyan-800 text-white rounded-md p-2 aria-disabled:bg-gray-200 pr-10 pl-10" aria-disabled={pending}>Salvar</button>
}


const Edit = ({ user }: EditFormProps) => {

    const [changePassword, setChangePassword] = useState(false);
    const [state, formAction] = useFormState(addOrUpdateUser, initialState);
    const ref = useRef<HTMLFormElement>(null);


    return <form ref={ref} action={formAction} className="flex w-full flex-wrap">

        <SuccessDialog
            isOpen={state.message && state.message == "success"}
            title={""}
            message={`Usuário ${user.id > 0 ? 'atualizado com sucesso' : 'criado com sucesso'}`}
            link={"/users"} />

        <div className="w-full p-10 pl-0 pr-0 flex justify-between flex-wrap">
            <AlertError message={state.message} />
            <h2 className="text-2xl">{user?.id ? 'Editar usuário' : 'Novo usuario'}</h2>

        </div>
        <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
            <input type="hidden" name="id" defaultValue={user?.id} />
            <FieldText groupProps={{ className: "w-full" }} defaultValue={user?.name} required={true} minLength={5} maxLength={50} name="name" label={"Nome"} className="w-full" />
            <FieldText groupProps={{ className: "w-full" }} type="email" defaultValue={user?.email} required={true} minLength={5} maxLength={50} name="email" label={"E-mail"} className="w-full" />
            <FieldSelect defaultValue={user.role} name="role" label="Perfil">
                <option value="1">Usuário</option>
                <option value="2">Gerente</option>
                <option value="3">Administrador</option>
            </FieldSelect>
            {user.id > 0 && <div className="mb-4 w-full pl-4 pr-4">
                <label htmlFor="changePassword" className="pr-4 pt-2">Mudar senha?</label>
                <input id="changePassword" className="bg-cyan-900" type="checkbox" name="changePassword" onChange={(ev) => setChangePassword(ev.target.checked)} checked={changePassword} value="Mudar senha?" />
            </div>
            }
            {(changePassword || user.id === 0) && <>
                <FieldText groupProps={{ className: "w-full" }} type="password" required={true} minLength={5} maxLength={15} name="password" label={"Senha"} className="w-full" />
                <FieldText groupProps={{ className: "w-full" }} type="password" required={true} minLength={5} maxLength={15} name="passwordConfirm" label={"Confirme a senha"} className="w-full" />
            </>

            }
        </div>
        <div className="flex w-full mt-5 mb-5 justify-between">
            <SecondaryButton onClick={(ev) => {
                ev.preventDefault();
                window.location.href = "/users"
            }} >Cancelar</SecondaryButton>
            <SubmitButton />
        </div>
    </form >

}
export default Edit;