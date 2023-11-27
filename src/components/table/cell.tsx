'use client';

import { Column } from "./table.types"

type Props = {
    column: Column,
    item: any;

}

export const Cell = ({ column, item }: Props) => {
    return <td  key={column.name} className={`p-4 ${column.smallHide?'hidden sm:table-cell':''}`}>

        {item[column.name]}
    </td>
}