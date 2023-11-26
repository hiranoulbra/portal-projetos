'use client';
import moment from "moment";
import { Column } from "./table.types"

type Props = {
    column: Column,
    item: any;

}
const getTypeValue = (type: string, value: any) => {
    switch (type) {
        case "date":
            return moment(value).format('DD/MM/YYYY');
        default:
            return value;
    }
}

export const Cell = ({ column, item }: Props) => {
    return <td  key={column.name} className={`p-4 ${column.smallHide?'hidden sm:table-cell':''}`}>

        {getTypeValue(column.type || '', item[column.name])}
    </td>
}