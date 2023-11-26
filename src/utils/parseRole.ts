import { ROLE } from "@/types/role";

export const parseRoleToText = (role: ROLE) => {
    switch (role) {
        case ROLE.ADMIN:
            return "Administrador";
        case ROLE.MANAGER:
            return "Gerente";
        case ROLE.USER:
            return "Usuário";
        default:
            return "Não definido";
    }
}

export const parseRole = (role: string) => {
    switch (role) {
        case "Administrador":
            return ROLE.ADMIN;
        case "Gerente":
            return ROLE.MANAGER;
        case "Usuário":
            return ROLE.USER;
        default:
            return ROLE.USER;
    }
}