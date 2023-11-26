import { AccessDenied } from "@/components/access-denied";
import { Header } from "@/components/header"
import { ROLE } from "@/types/role";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== ROLE.ADMIN) {
        return <div className="flex items-center h-screen flex-col">
            <Header /> <div className="flex max-w-6xl p-4 flex-wrap">
                <AccessDenied href="/" />
            </div>
        </div>;
    }
    return (
        <div className="flex items-center h-screen flex-col">
            <Header />
            <div className="flex max-w-6xl p-4 flex-wrap">
                {children}
            </div>
        </div>

    )
}
