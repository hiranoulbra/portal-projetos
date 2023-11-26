
import { NavProvider } from "./nav.context"

import { NavBar } from "./navbar";
import { User, getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { ROLE } from "@/types/role";
import { NavLink } from "./nav-link";
import { NavBarMobile } from "./navbar.mobile";

export type NavItem = {
    name: string;
    href: string;
    current?: boolean;
}

const Nav = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user as unknown as User;

    const navItems: NavItem[] = [
        {
            name: 'Projetos',
            href: '/projects',
        }
    ]
    if (session?.user?.role === ROLE.ADMIN) {
        navItems.push({
            name: 'Usuários',
            href: '/users',
        }, {
            name: 'Relatórios',
            href: '/reports',
        })
    }
    return <NavProvider>
        <NavBar user={user.name ?? ''}>
            {navItems.map((item, index) => {
                return <NavLink key={`menu-${index}`} href={item.href}>{item.name}</NavLink>;
            })}
        </NavBar>
        <NavBarMobile user={user.name}>
            {navItems.map((item, index) => {
                return <NavLink key={`menu-${index}`} isMobile={true} href={item.href}>{item.name}</NavLink>;
            })}
        </NavBarMobile>
    </NavProvider >
}
export default Nav;