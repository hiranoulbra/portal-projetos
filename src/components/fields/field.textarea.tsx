interface FieldTextProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    groupProps?: React.HTMLAttributes<HTMLDivElement>;
    labelProps?: React.HTMLAttributes<HTMLLabelElement>;
    classNameLabel?: string;
}
export const FieldTextArea = ({ label, name, value, labelProps, groupProps, onChange, ...props }: FieldTextProps) => {
    return <div className={`${groupProps?.className ?? ''} mb-4 sm:w-full pl-4 pr-4`} >
        <label className={`block mb-2 text-gray-800 ${labelProps?.className ?? ''}`} htmlFor={name}>{label}</label>
        <textarea   {...props} className={`border rounded-md border-cyan-600 p-2 w-full ${props.className ?? ''}`} onChange={onChange} name={name} value={value}/>
    </div >
}

