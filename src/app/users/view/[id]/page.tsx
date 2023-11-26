


import { getUser } from "@/actions/users.actions";

import { Breadcrumb } from "@/components/breadcrumb";
import { FieldText } from "@/components/fields/field.text";
import { SecondaryButton } from "@/components/ui/buttons";
import { parseRoleToText } from "@/utils/parseRole";

type EditProjectProps = {
    params: {
        id: number;
    }
}
export default async function NewUser({ params: { id } }: EditProjectProps) {
    const { user } = await getUser(isNaN(id) ? 0 : id);
    return (
        <div className="flex max-w-6xl justify-center flex-wrap">
            <Breadcrumb items={[{ label: "Usuários", href: "/users" }, { label: user?.name }]} />
            <div className="w-full p-10 pl-0 pr-0 flex justify-between">
                <h2 className="text-2xl">Visualizar usuário</h2>
            </div>
            <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
                <input type="hidden" name="id" defaultValue={user?.id} />
                <FieldText disabled={true} groupProps={{ className: "w-full" }} defaultValue={user?.name} label={"Nome"} className="w-full" />
                <FieldText disabled={true} groupProps={{ className: "w-full" }} type="email" defaultValue={user?.email} label={"E-mail"} className="w-full" />
                <FieldText disabled={true} groupProps={{ className: "w-full" }} type="text" defaultValue={parseRoleToText(user?.role)} label={"Perfil"} className="role" />
            </div>
            <div className="flex w-full mt-5 mb-5 justify-between">
                <SecondaryButton href="/users" >Voltar</SecondaryButton>
            </div>
        </div >
    )
}
