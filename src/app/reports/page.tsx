import { Breadcrumb } from "@/components/breadcrumb";
import { FieldSelect } from "@/components/fields/field.select";
import { StatusProject } from "./components/StatusProject";
import { getReportRiskByYear, getReportStatus, getReportStatusBudget, getYears } from "@/actions/reports.action";
import { get } from "http";
import { FieldYear } from "./components/field-year";
import { AccessDenied } from "@/components/access-denied";
import { ROLE } from "@/types/role";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

type Props = {
    searchParams: {
        year: string;
    }
}

export default async function ReportPage({ searchParams }: Props) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== ROLE.ADMIN && session?.user?.role !== ROLE.MANAGER) {
        return <AccessDenied href="/projects" />
    }
    let year = parseInt(searchParams.year || new Date().getFullYear().toString());
    if (isNaN(year)) {
        year = new Date().getFullYear();
    }
    const reportStatusItems = await getReportStatus(year)
    const reportRiskItems = await getReportRiskByYear(year);
    const reportBugdetItems = await getReportStatusBudget(year);
    const years = await getYears();
    return (
        <>
            <Breadcrumb items={[{ label: "Relatórios" }]} />

            <div className="flex w-full flex-wrap">
                <div className="flex w-full justify-between mt-4 mb-4 items-center">
                    <h2 className="text-2xl">Relatórios</h2>
                    <div className="flex gap-3 items-center">
                        <FieldYear years={years} />
                    </div>
                </div>
                <StatusProject title="Projetos por Status" data={reportStatusItems} />
                <StatusProject title="Projetos por Risco" description="O grafico abaixo lista os risco de projetos em andamento" data={reportRiskItems} />
                <StatusProject title="Projetos por Budget" description="O grafico abaixo lista o acumulado de orçamento de projetos por status pelo mes de cadastro" data={reportBugdetItems} />
            </div>
        </>);
}
