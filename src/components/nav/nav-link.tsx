'use client';


import { usePathname } from "next/navigation";



type Props = {
    children: React.ReactNode;
    href: string;
    className?: string;
    isMobile?: boolean;
    
}
export const NavLink = async ({ children, href,  className, isMobile }: Props) => {  
    const pathname = usePathname();
    return <li>
        <a className={`${isMobile ? 'block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded aria-selected:bg-gray-100' : 'text-sm text-white hover:text-gray-500 aria-selected:border-b-2 aria-selected:pb-1'}  ${className??''}`} aria-selected={pathname.startsWith(href)}  href={href}>{children}</a>
    </li>

}

