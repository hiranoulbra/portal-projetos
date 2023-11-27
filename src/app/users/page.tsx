
import { Table } from "@/components/table";

import { Breadcrumb } from "@/components/breadcrumb";
import { PrimaryButton } from "@/components/ui/buttons";

import Pagination from "@/components/pagination";
import { SearchParamsProjectType } from "@/actions/project.actions";
import { deleteUser, getUsers, lockOrUnlockUser } from "@/actions/users.actions";


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
                        isUser={true}
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
