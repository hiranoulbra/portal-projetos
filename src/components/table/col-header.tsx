'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Column } from "./table.types";
import { useCallback, useEffect, useState } from "react";

type Props = {
    column: Column
}

const getSort = (sort: string, columnName: string) => {
    if (sort) {
        const [name, order] = sort.split('-');
        if (name === columnName) {
            return order;
        }
        return '';
    }
    return '';
}
export const ColHeader = ({ column }: Props) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [order, setOrder] = useState('');
    useEffect(() => {
        setOrder(getSort(searchParams.get('sort') || '', column.name));
    }, [column.name,searchParams])



    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    return <th key={column.name} className={`p-4${column.smallHide ? ' hidden sm:table-cell' : ''}`}>
        <button onClick={() => {
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            router.push(pathname + '?' + createQueryString('sort', `${column.name}-${newOrder}`))
        }}>
            {column.label}
            {order && (order == 'asc' ? '▲' : '▼')}
        </button>
    </th>;

}

