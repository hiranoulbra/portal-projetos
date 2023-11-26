'use client';
import { Logo } from "@/utils/icons/Logo";
import { NavButton } from "./navbar.button";
import { SignOutButton } from "./nav.signout";


export interface NavBarProps {
    user?: string;
    children?: React.ReactNode;
}
export const NavBar: React.FC<NavBarProps> = ({ children, user }) => {
    return <nav className="relative px-4 py-4 flex justify-between items-center bg-cyan-900">
        <a className="text-3xl font-bold leading-none" href="#">
            <Logo className="text-white w-10 h-10" />
        </a>
        <div className="lg:hidden">
            <NavButton className="navbar-burger flex items-center text-white p-3">
                <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </NavButton>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
            {children}
        </ul>
        <div className="hidden lg:flex justify-center gap-3 items-center">
            {user && <p className="flex text-white">Olá, {user}</p>}

            <SignOutButton className="hidden lg:inline-block lg:ml-auto text-white fill-none" />
        </div>
    </nav>
}