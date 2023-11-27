'use client';
import { FieldSelect } from "@/components/fields/field.select";
import { FieldText } from "@/components/fields/field.text";
import { FieldTextArea } from "@/components/fields/field.textarea";
import { ProjectType } from "@/types/project";
import { formatDate } from "@/utils/format.date";
import { User } from "next-auth";

const groupProps = {
    className: "w-full xl:w-1/4 lg:w-1/2"
}

type Props = {
    project: ProjectType;
    managers: User[];
    isManager?: boolean;

}
const Info = ({ project, managers,isManager }: Props) => {
   
    return <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
        <input type="hidden" name="id" defaultValue={project?.id} />
        <FieldText groupProps={{ className: "w-full" }} defaultValue={project?.title} required={true} minLength={5} maxLength={50} name="title" label={"Título"} className="w-full" />
        <FieldTextArea groupProps={{ className: "w-full" }} defaultValue={project?.description} name="description" type="text" label={"Descrição"} />
        {isManager &&<input type="hidden" name="manager_id" defaultValue={project?.manager_id} />}
        <FieldSelect disabled={isManager} defaultValue={project?.manager_id} name="manager_id" label="Gestor">
            {managers.map(manager => <option key={manager.id} value={manager.id}>{manager.name}</option>)}
        </FieldSelect>
        <FieldSelect defaultValue={project?.status} name="status" label="Status">
            <option value="Não iniciado">Não iniciado</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>

        </FieldSelect>
        <FieldText defaultValue={formatDate(project?.start_date)} name="start_date" required type="date" label={"Data de Inicio"} groupProps={groupProps} />
        <FieldText defaultValue={formatDate(project?.end_date)} name="end_date" required type="date" label={"Data Final"} groupProps={groupProps} />
        <FieldText defaultValue={project?.planned} name="planned" min={0} max={100} type="number" label={"Previsto"} groupProps={groupProps} />
        <FieldText defaultValue={project?.executed} name="executed" min={0} max={100} type="number" label={"Executado"} groupProps={groupProps} />
        <FieldText groupProps={{ className: "w-full" }} defaultValue={project?.budget} type="number" required={true} name="budget" label={"Orçamento"} className="w-full" />
    </div>
}
export default Info;