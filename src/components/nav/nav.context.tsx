'use client';
import { useCallback, useContext } from "react";
import React from "react";
export interface NavContext {
    onToggleMenu: () => void;
}
const context = React.createContext<NavContext>({ onToggleMenu: () => { } });

interface Props {
    children?: React.ReactNode;
}

export const NavProvider = ({ children }: Props) => {
    const onToggleMenu = useCallback(
        () => {
        
            const menu = document.querySelectorAll('.navbar-menu');
    
            for (var j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
            }
        },
        [],
    );

    return <context.Provider value={{ onToggleMenu }}>
        {children}
    </context.Provider>
}

export default context;