
import { Table } from "@/components/table";

import { Breadcrumb } from "@/components/breadcrumb";
import { PrimaryButton } from "@/components/ui/buttons";

import Pagination from "@/components/pagination";
import { SearchParamsProjectType, getProjects } from "@/actions/project.actions";
import { deleteUser, getUsers } from "@/actions/users.actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { ROLE } from "@/types/role";
import { AccessDenied } from "@/components/access-denied";

interface IClient {
    client: string;
    contact: string;
    phone: string;
}

const columns =
    [
        {
            name: "name",
            label: "Nome",
        }, {
            name: "email",
            label: "E-mail",
            smallHide: true,
        },
        {
            name: "roleDescription",
            label: "Perfil",
        }
    ]

type Props = {
    searchParams: SearchParamsProjectType;
}
const columnsNames = columns.map(column => column.name);
export default async function PrivatePage({ searchParams }: Props) {
 

    const { items, pages } = await getUsers(searchParams);
    return (
        <>
            <Breadcrumb items={[{ label: "Usuários" }]} />

            <div className="flex w-full flex-wrap">

                <div className="flex w-full justify-between mt-4 mb-4 items-center">
                    <h2 className="text-2xl">Usuários</h2>
                    <div className="flex gap-3 items-center">
                        <PrimaryButton href="/users/edit" >Novo usuario</PrimaryButton>
                        {/*<Filter />*/}
                    </div>
                </div>
                <main className="text-left w-full">
                    <Table className="bg-white shadow-md p-2" columns={columns} items={items}
                        editUrl="/users/edit"
                        viewUrl="/users/view"
                        deleteForm=
                        {{
                            title: "Excluir Usuário",
                            text: "Deseja realmente excluir este usuário?",
                            action: deleteUser
                        }} />
                    <Pagination totalPages={pages} />

                </main>
            </div>
        </>
    )
}
