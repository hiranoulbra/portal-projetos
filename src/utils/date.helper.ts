import dayjs from "dayjs";

export const startOfDay = (date?: string) => {
    if (date === null || date === undefined) return null;

    return dayjs(date).startOf('day').toISOString();
}
export const endOfDay = (date?: string) => {
    if (date === null || date === undefined) return null;

    return dayjs(date).endOf('day').toISOString();
}