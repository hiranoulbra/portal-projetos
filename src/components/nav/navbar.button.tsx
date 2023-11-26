'use client'
import { useContext } from "react";
import NavContext from "./nav.context";
interface Props {
    children?: React.ReactNode;
    className?: string;
}
export const NavButton = ({ children, className }: Props) => {
    const { onToggleMenu } = useContext(NavContext);
    return <button onClick={onToggleMenu} className={className}>
        {children}
    </button>
}