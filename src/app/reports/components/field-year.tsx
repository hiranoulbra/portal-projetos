'use client';

import { FieldSelect } from "@/components/fields/field.select";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    years: number[];
}

export function FieldYear({ years }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`${pathname}?year=${event.target.value}`);
    }
    return (
        <div className="flex gap-3 items-center">
            <FieldSelect onChange={onChange}>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </FieldSelect>
        </div>
    );
}