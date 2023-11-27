'use client'
import React from "react"
import { Cell } from "./cell"
import { Column } from "./table.types"
import { ColHeader } from "./col-header"
import EditIcon from "@/utils/icons/edit.icon"
import ViewIcon from "@/utils/icons/view.icons"
import { DeleteForm } from "@/app/projects/components/delete.form"

//import { LockActionType } from "@/types/lock-action.type"
//import { LockForm } from "../lock.form"
import Link from "next/link"


type Props = {
    columns: Column[],
    items: any[],
    onSort?: (column: Column) => void,
    className?: string,
    editUrl?: string,
    viewUrl?: string,
    deleteForm: {
        title: string,
        text: string
    
    }
    isUser: boolean;

}
export const Table = ({ columns, items, className, deleteForm, editUrl, viewUrl, isUser }: Props) => {
    return (
        <table className={`w-full ${className}`}>
            <thead>
                <tr className="border-b border-gray-200">
                    {columns.map((column) => (
                        <ColHeader key={column.name} column={column} />

                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr className="odd:bg-gray-100" key={index}>
                        {columns.map((column, indexC) => (<Cell key={`$cell-${index}-${indexC}`} column={column} item={item} />))}
                        <td className="flex justify-end g ap-2 p-4">
                            
                            <Link href={`${viewUrl}/${item.id}`} className="text-cyan-600"><ViewIcon /></Link>
                            {item.canEdit && <Link href={`${editUrl}?id=${item.id}`} className="text-cyan-900"><EditIcon /></Link>}
                            {item.canDelete && <DeleteForm  id={item.id} {...deleteForm} isUser={isUser}/>}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
//{isUser && <LockForm id={item.id} isLocked={item.isLocked} />}