'use client';
import { Logo } from "@/utils/icons/Logo";
import { SignOutButton } from "./nav.signout";
import { NavbarBackDrop } from "./navbar.backdrop";
import { NavButton } from "./navbar.button";

export interface NavBarMobileProps {
    children?: React.ReactNode;
    user?: string;
}
export const NavBarMobile: React.FC<NavBarMobileProps> = ({ children, user }) => {
    return <div className="navbar-menu relative z-50 hidden">
        <NavbarBackDrop />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
                <div className="flex w-full justify-center">

                    <Logo className="text-cyan-900 w-10 h-10" />

                </div>

                <NavButton className="navbar-close">
                    <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </NavButton>
            </div>
            {user && <div className="p-4 flex justify-center">
                Olá, {user}
            </div>}
            <div>
                <ul>
                    {children}

                </ul>
            </div>
            <div className="mt-auto">

                <div className="pt-6 flex justify-center">
                    <SignOutButton className="block  border-cyan-900 border  text-white bg-cyan-900" />
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                    <span>Copyright © 2023</span>
                </p>
            </div>
        </nav >
    </div >
}
/*

 <li className="mb-1">
                        <a className="" href="#">Home</a>
                    </li>
                    <li className="mb-1">
                        <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">About Us</a>
                    </li>
                    <li className="mb-1">
                        <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Services</a>
                    </li>
                    <li className="mb-1">
                        <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Pricing</a>
                    </li>
                    <li className="mb-1">
                        <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Contact</a>
                    </li>
                    */