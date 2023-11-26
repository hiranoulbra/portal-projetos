export type Column = {
    name: string,
    label: string,
    sortable?: boolean,
    type?: string,
    smallHide?: boolean,
    render?: (item: any) => React.ReactNode,
}
