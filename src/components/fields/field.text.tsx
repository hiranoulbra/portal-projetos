interface FieldTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    groupProps?: React.HTMLAttributes<HTMLDivElement>;
    labelProps?: React.HTMLAttributes<HTMLLabelElement>;
    classNameLabel?: string;
    overrideClassName?: boolean;
}
export const FieldText = ({ label, name, value, labelProps, groupProps, overrideClassName, onChange, ...props }: FieldTextProps) => {
    const groupClassName = overrideClassName ? groupProps?.className ?? '' : `${groupProps?.className ?? ''} mb-4 sm:w-full pl-4 pr-4`;
    return <div className={groupClassName} >
        {label &&
            <label className={`block mb-2 text-gray-800 ${labelProps?.className ?? ''}`} htmlFor={name}>{label}</label>}
        <input type="text" {...props} className={`border rounded-md border-cyan-600 p-2 w-full ${props.className ?? ''}`} onChange={onChange} name={name} value={value} />
    </div >
}

