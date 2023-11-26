'use client';

import { useContext } from "react";
import NavContext from "./nav.context";
export const NavbarBackDrop = () => {
    const { onToggleMenu } = useContext(NavContext);
    return <div onClick={onToggleMenu} className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>;
}