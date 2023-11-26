interface FieldSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    groupProps?: React.HTMLAttributes<HTMLDivElement>;
    labelProps?: React.HTMLAttributes<HTMLLabelElement>;
}
export const FieldSelect = ({ name, label, groupProps, labelProps, children, ...props }: FieldSelectProps) => {
    return (<div className={`mb-4 w-full pl-4 pr-4 ${groupProps?.className ?? ''}`}>
        <label className={`block mb-2 text-gray-800 ${labelProps?.className ?? ''}`} htmlFor={name}>{label}</label>
        <select  {...props} className={`border rounded-md border-cyan-600 p-2 w-full ${props.className ?? ''}`} name={name} >
            {children}
        </select>
    </div>
    )
}
