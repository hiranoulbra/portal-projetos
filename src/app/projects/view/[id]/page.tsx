import { getViewProject } from "@/actions/project.actions";

import { redirect } from "next/navigation";
import Info from "./components/info";
import { ProjectType } from "@/types/project";
import { Members } from "./components/members";
import Archive from "./components/archive";
import { AccessDenied } from "@/components/access-denied";

type Props = {
    params: {
        id: string;
    }
}


const Page = async ({ params: { id } }: Props) => {

    let _id = parseInt(id);

    const project = await getViewProject(_id);
    if (project === null) {
       
        return <AccessDenied href="/projects" />
    }

    return (
        <div className="flex justify-center flex-wrap">
            <div className="flex xl:w-3/4 flex-wrap">
                <ul className="flex w-full pt-5 pl-0 pr-0 justify-start">
                    <li className="mr-5 font-bold "><a href="/">Home</a></li>
                    <li className="mr-5 font-bold">/</li>
                    <li className="mr-5 font-bold"><a href="/projects">Projetos</a></li>
                    <li className="mr-5">/</li>
                    <li className="mr-5 text-cyan-900">{project.title}</li>
                </ul>
                <div className="w-full p-10 pl-0 pr-0 flex justify-between">
                    <h2 className="text-2xl">Visualizar projeto</h2>

                </div>
                <Info project={project} />
                <Members users={project.members} />
                <Archive archives={project.archives} />
            </div>
        </div>
    )



}

export default Page;