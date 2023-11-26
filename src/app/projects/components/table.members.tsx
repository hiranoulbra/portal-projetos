'use client';
import DeleteIcon from "@/utils/icons/delete.icon";
import { parseRoleToText } from "@/utils/parseRole";
import { User } from "next-auth";

type MembersTableProps = {
    users: User[];
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    isEdit?: boolean;
}


export const TableMembers = ({ users, onClick, isEdit }: MembersTableProps) => {
    return <table className="w-full text-left">
        <thead>
            <tr className="border-b border-gray-300">
                <th className="pt-4 pb-4">Nome</th>
                <th className="pt-4 pb-4">Função</th>
                <th className="pt-4 pb-4"></th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr className="even:bg-gray-100" key={`members-${index}`}    >
                    <td className="pt-4 pb-4">{user.name}</td>
                    <td className="pt-4 pb-4">{parseRoleToText(user.role)}</td>
                    {isEdit &&
                        <td className="pt-4 pb-4 flex justify-end cursor-pointer">
                            <input type="hidden" name="members_id" value={user.id} />
                            <a data-index={index} onClick={onClick} ><DeleteIcon /></a>
                        </td>
                    }

                </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={3} className="text-center p-4">Nenhum arquivo encontrado</td></tr>}
        </tbody>
    </table>
}
