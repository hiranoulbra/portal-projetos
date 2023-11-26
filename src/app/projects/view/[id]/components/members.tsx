'use client';
import { TableMembers } from "@/app/projects/components/table.members";
import { FieldSelect } from "@/components/fields/field.select";
import { PrimaryButton } from "@/components/ui/buttons";
import { ProjectType } from "@/types/project";
import DeleteIcon from "@/utils/icons/delete.icon";
import { parseRoleToText } from "@/utils/parseRole";
import { User } from "next-auth";
import { useState } from "react";

type Props = {
    users: User[];


}
export const Members = ({ users }: Props) => {



    return <>
        <h2 className="w-full text-xl flex justify-start p-5 pl-0">Membros</h2>

        <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
            <TableMembers users={users} />
        </div>
    </>;
}