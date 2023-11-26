export const PrimaryButton: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => {
    return <a {...props} className={`cursor-pointer bg-cyan-900 hover:bg-cyan-800 text-white rounded-md p-2 pl-4 pr-4 ${props.className ?? ''}`}>{children}</a>
}
export const SecondaryButton: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => {
    return <a {...props} className={`cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md p-2 pl-4 pr-4 ${props.className ?? ''}`}>{children}</a>
}

