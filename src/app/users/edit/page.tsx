


import { getUser } from "@/actions/users.actions";
import Edit from "./components/edit.form";
import { Breadcrumb } from "@/components/breadcrumb";

type EditProjectProps = {
    searchParams: {
        id: number;
    }
}
export default async function NewUser({ searchParams: { id } }: EditProjectProps) {
    const { user } = await getUser(isNaN(id) ? 0 : id);


    return (
        <div className="flex max-w-6xl justify-center flex-wrap">
            <Breadcrumb items={[{ label: "Usuários", href: "/users" }, { label: user?.name ?? 'Novo usuário' }]} />
            <Edit user={user} />
        </div >
    )
}
