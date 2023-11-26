import { User } from "next-auth";
import { ArchiveType } from "./archive";
import { PermissionItemType } from "./permission-item";

export type ProjectType = {
    id: number;
    title: string;
    description: string;
    manager_id: number;
    manager_name?: string;
    start_date: Date;
    end_date: Date;
    planned: number;
    executed: number;
    status: string;
    members_id: number[];
    archives: ArchiveType[];
    members: User[];
} & PermissionItemType;