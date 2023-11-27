
import Edit from "./components/edit";
import { ProjectType } from "@/types/project";
import { getManagers, getEditProject, getUsers } from "@/actions/project.actions";
import { Breadcrumb } from "@/components/breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { ROLE } from "@/types/role";
import { AccessDenied } from "@/components/access-denied";
type EditProjectProps = {
    searchParams: {
        id: number;
    }
}
export default async function NewProject({ searchParams: { id } }: EditProjectProps) {
    const session = await getServerSession(authOptions);
    const managers = await getManagers();
    const users = await getUsers();
    const project = await getEditProject(id || 0, session?.user);

    if (project === null) {
        return <AccessDenied href="/projects" />
    }
    return (
        <div className="flex justify-center w-full flex-wrap">
            <Breadcrumb items={[{ label: "Projetos", href: "/projects" }, { label: project?.title ?? 'Novo projeto' }]} />

            <Edit isManager={session?.user.role === ROLE.MANAGER} managers={managers} project={project} users={users} />


        </div >
    )
}
