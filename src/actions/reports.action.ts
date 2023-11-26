import { getProjectRiskByYear, getProjectYears, getItemsByYear } from "@/core/db/db.project"
import { getProjects } from "./project.actions"
import { DataSetType } from "@/types/dataset";
import dayjs from "dayjs";
import { getColorByStatus } from "@/utils/status.helper";
import { getIndicators } from "@/core/db/db.indicators";


export const getReportStatus = async (year: number) => {

    const projects = await getItemsByYear(year);


    const datasets: DataSetType[] = [];

    projects.map((project) => {
        const month = dayjs(project.start_date).month()
        const index = datasets.findIndex((dataset) => dataset.label === project.status);
        if (index >= 0) {
            datasets[index].data[month] += 1;
        } else {
            const item = {
                label: project.status,
                data: Array.from({ length: 12 }, () => 0),
                backgroundColor: getColorByStatus(project.status)
            }
            item.data[month] += 1;
            datasets.push(item)
        }
    })
    return datasets;

}

export const getReportRiskByYear = async (year: number) => {
    const projects = await getProjectRiskByYear(year);
    const indicators = await getIndicators();

    const datasets: DataSetType[] = indicators.map((indicator) => {
        const newDataSet = {
            label: indicator.name,
            data: Array.from({ length: 12 }, () => 0),
            backgroundColor: indicator.color
        } as DataSetType;
        projects.filter((p) => {
            let current = p.planned - p.executed;
      
            return current >= indicator.min && current <= indicator.max
        }).map((project) => {
            const month = dayjs(project.start_date).month()
            newDataSet.data[month] += 1;
        });
        return newDataSet;
    });
    return datasets;
}

export const getYears = async () => {
    const result = await getProjectYears();
    return result;
}