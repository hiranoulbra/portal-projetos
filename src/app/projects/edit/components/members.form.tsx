'use client';
import { FieldSelect } from "@/components/fields/field.select";
import { PrimaryButton } from "@/components/ui/buttons";
import { ProjectType } from "@/types/project";
import DeleteIcon from "@/utils/icons/delete.icon";
import { parseRoleToText } from "@/utils/parseRole";
import { User } from "next-auth";
import { useState } from "react";
import { TableMembers } from "../../components/table.members";

type Props = {
    users: User[];
    members: number[];


}
export const Members = ({ users, members }: Props) => {
    const [usersId, setUsersId] = useState<number[]>(members || []);

    const onAddUser = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();
        const user = document.querySelector('select[name="user_select"]') as HTMLSelectElement;
        const managerId = parseInt(user.value);
        if (!usersId.includes(managerId)) {
            setUsersId([...usersId, managerId]);
        }
    }
    const onRemoveUser: React.MouseEventHandler<HTMLAnchorElement> = (ev) => {
        ev.preventDefault();
        const id = parseInt(ev.currentTarget?.dataset?.id || '0');
        setUsersId(usersId.filter(id => id !== id));
    }
    return <>
        <h2 className="text-xl p-5 pl-0">Membros</h2>

        <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">

            <div className="flex gap-2 w-full">
                <FieldSelect groupProps={{ className: "pr-0" }} name="user_select" label="Gestor">
                    {users.filter(u => usersId.indexOf(u.id) < 0).map(user => <option key={user.id} value={user.id}>{user.name} ({parseRoleToText(user.role)})</option>)}
                </FieldSelect>
                <div>
                    <label className={`block mb-2 text-gray-800`}>&nbsp;</label>
                    <PrimaryButton onClick={onAddUser}>Adicionar </PrimaryButton>
                </div>
            </div>
            <TableMembers users={users.filter(u => usersId.indexOf(u.id) >= 0)} isEdit={true} onClick={onRemoveUser } />
        </div>
    </>;
}