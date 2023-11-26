'use client';
import { FieldText } from "@/components/fields/field.text";
import { FieldTextArea } from "@/components/fields/field.textarea";
import { ProjectType } from "@/types/project";
import { formatDate } from "@/utils/format.date";

const groupProps = {
    className: "w-full xl:w-1/4 lg:w-1/2"
}

type Props = {
    project: ProjectType;


}
const Info = ({ project }: Props) => {
    return <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
        <FieldText disabled={true} groupProps={{ className: "w-full" }} defaultValue={project?.title} required={true} minLength={5} maxLength={50} name="title" label={"Título"} className="w-full" />
        <FieldTextArea disabled={true} groupProps={{ className: "w-full" }} defaultValue={project?.description} name="description" type="text" label={"Descrição"} />
        <FieldText disabled={true} defaultValue={project?.status} name="status" required type="text" label={"Status"} groupProps={{ className: "w-full" }}  />
        <FieldText disabled={true} defaultValue={project?.manager_name} name="managerName" required type="text" label={"Gestor"} groupProps={{ className: "w-full" }}  />
        <FieldText disabled={true} defaultValue={formatDate(project?.start_date)} name="start_date" required type="date" label={"Data de Inicio"} groupProps={groupProps} />
        <FieldText disabled={true} defaultValue={formatDate(project?.end_date)} name="end_date" required type="date" label={"Data Final"} groupProps={groupProps} />
        <FieldText disabled={true} defaultValue={project?.planned} name="planned" min={0} max={100} type="number" label={"Previsto"} groupProps={groupProps} />
        <FieldText disabled={true} defaultValue={project?.executed} name="executed" min={0} max={100} type="number" label={"Executado"} groupProps={groupProps} />
    </div>
}
export default Info;