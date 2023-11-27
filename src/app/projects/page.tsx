
import { Table } from "@/components/table";

import { Breadcrumb } from "@/components/breadcrumb";
import { PrimaryButton } from "@/components/ui/buttons";
import { Filter } from "./components/filter";
import Pagination from "@/components/pagination";
import { SearchParamsProjectType, deleteProject, getProjects } from "@/actions/project.actions";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { ROLE } from "@/types/role";


const columns =
    [
        {
            name: "title",
            label: "Projeto",
        }, {
            name: "manager_name",
            label: "gestor",
            smallHide: true,
        },
        {
            name: "start_date",
            label: "Início",
            type: "date",
            smallHide: true,
        }, {
            name: "end_date",
            label: "Fim",
            type: "date",
            smallHide: true,
        }, {
            name: "status",
            label: "Status",
        }
    ]

type Props = {
    searchParams: SearchParamsProjectType;
}
const columnsNames = columns.map(column => column.name);
export default async function ProjectPages({ searchParams }: Props) {
    const session = await getServerSession(authOptions);
    const { items, pages } = await getProjects(searchParams);
    return (
        <>
            <Breadcrumb items={[{ label: "Projetos" }]} />

            <div suppressHydrationWarning={true} className="flex w-full flex-wrap">

                <div className="flex w-full justify-between mt-4 mb-4 items-center">
                    <h2 className="text-2xl">Projetos</h2>
                    <div className="flex gap-3 items-center">
                        {(session?.user.role === ROLE.ADMIN || session?.user.role === ROLE.MANAGER) && <PrimaryButton href="/projects/edit" >Novo projeto</PrimaryButton>}
                        <Filter />
                    </div>
                </div>
                <main className="text-left w-full">
                    <Table isUser={false} className="bg-white shadow-md p-2" columns={columns} items={items}
                        editUrl="/projects/edit"
                        viewUrl="/projects/view"
                        deleteForm=
                        {{
                            title: "Excluir Projeto",
                            text: "Deseja realmente excluir este projeto?",
                           
                        }} />
                    <Pagination totalPages={pages||1} />

                </main>
            </div>
        </>
    )
}
