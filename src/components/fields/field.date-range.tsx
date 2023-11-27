'use client';
import { FieldText } from "./field.text"

export type DateRange = {
    start?: string;
    end?: string;
}

type FieldProps = {
    label: string;
    name: string;
    value: DateRange;
    onChange: (value: DateRange) => void;
}

export const FieldDateRange = ({ label, name, value, onChange }: FieldProps) => {

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fName = e.target.name;
        const fvalue = e.target.value;
        if (fName === `${name}_start`) {
            onChange({ start: fvalue, end: value?.end });
        } else {
            onChange({ start: value?.start, end: fvalue });
        }

    }
    return <div className="pl-4 pr-4 mb-4">
        <label className="block mb-2 text-gray-800 ">{label}</label>
        <div className="flex gap-3 items-center">
            <FieldText value={value?.start} name={`${name}_start`} onChange={onDateChange} type="date" overrideClassName={true} groupProps={{ className: "mb-0 pl-0 pr-0 w-full" }} placeholder="dd/mm/aaaa" label={""} />
            -
            <FieldText name={`${name}_end`} value={value?.end} onChange={onDateChange} type="date" overrideClassName={true} groupProps={{ className: "mb-0 pl-0 pr-0 w-full" }} placeholder="dd/mm/aaaa" label={""} />
        </div>
    </div>;
}