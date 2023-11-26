import { User } from "next-auth";
import { PermissionItemType } from "./permission-item";

export type UserType = User & PermissionItemType;