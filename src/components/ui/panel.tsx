
type PanelProps = {
    children: React.ReactNode;
    className?: string;
}
export const Panel: React.FC<PanelProps> = ({ children,className }) => {
    return <div className="absolute z-30 w-full h-full bg-black bg-opacity-30 top-0 left-0 flex justify-end">
        <div className={`relative lg:w-1/4 sm:w-full h-full bg-gray-100 ${className}`}>
            {children}
        </div>
    </div>
}
