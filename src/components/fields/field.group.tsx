
type FieldGroupProps = {
    children: React.ReactNode;
    className?: string;
    [x: string]: any;
};
export const FieldGroup = ({ children, className, ...props }: FieldGroupProps) => {
    return (
        <div className={`mb-4 ${className}`} {...props}>
            {children}
        </div>
    )
}