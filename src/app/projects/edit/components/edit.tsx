'use client';
import moment from "moment";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { FieldText } from "@/components/fields/field.text";
import { FieldTextArea } from "@/components/fields/field.textarea";
import { FieldSelect } from "@/components/fields/field.select";
import { ProjectType } from "@/types/project";
import { submitProject } from "@/actions/project.actions";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { User } from "next-auth";
import { parseRoleToText } from "@/utils/parseRole";
import { Table } from "@/components/table";
import DeleteIcon from "@/utils/icons/delete.icon";
import Info from "./info.form";
import { Members } from "./members.form";
import Archive from "./archive.form";
import { ArchiveType } from "@/types/archive";
import { SuccessDialog } from "@/components/dialogs/success.dialog.";
import { AlertError } from "@/components/alert.error";




type EditFormProps = {
    project: ProjectType;
    managers: User[];
    isManager?: boolean;
    users: User[];
}

const initialState = {
    message: null
}



const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <button type="submit" className="bg-cyan-900 hover:bg-cyan-800 text-white rounded-md p-2 aria-disabled:bg-gray-200 pr-10 pl-10" aria-disabled={pending}>Salvar</button>
}


const Edit = ({ project, managers, users,isManager }: EditFormProps) => {
    const [archives, setArchives] = useState<ArchiveType[]>(project.archives || [])
    const [state, formAction] = useFormState(submitProject, initialState);
    const ref = useRef<HTMLFormElement>(null);

    const onChangeArchives = (archives: ArchiveType[]) => {
        setArchives(archives);
    }
    return <form ref={ref} action={async (formData) => {
        archives.forEach(archive => {
            if (archive.id === 0)
                formData.append('archives', archive.content, archive.name);
            else {

                formData.append('archives_id', archive.id.toString());

            }

        });
        await formAction(formData);
    }} className="flex w-full flex-wrap">
        <SuccessDialog
            isOpen={state.message && state.message == "success"}
            title={""}
            message={`Projeto ${project.id > 0 ? 'atualizado com sucesso' : 'criado com sucesso'}`}
            link={"/projects"} />
        <div className="w-full p-10 pl-0 pr-0 flex justify-between">
            <AlertError message={state.message} />
            <h2 className="text-2xl">{project?.id ? 'Editar projeto' : 'Novo projeto'}</h2>

        </div>
        <Info isManager={isManager} project={project} managers={managers} />
        <Members users={users} members={project.members_id} />
        <Archive archives={archives} onChange={onChangeArchives} />
        <div className="flex w-full mt-5 mb-5 justify-between">
            <SecondaryButton onClick={(ev) => {
                ev.preventDefault();
                window.location.href = "/projects"
            }} >Cancelar</SecondaryButton>
            <SubmitButton />
        </div>
    </form>

}
export default Edit;