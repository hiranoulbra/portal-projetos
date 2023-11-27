'use server';
import { ROLE } from "@/types/role";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { QueryUserType, addItem, changeUserStatus, deleteItem, getItem, getItemsCount, getPagedItems, updateItem, verifyIfUserExists } from "@/core/db/db.user";
import { revalidatePath } from "next/cache";

export type SearchParamsUserType = {
    q?: string;
    type?: string;
    page?: string;
    sort?: string;
}

export const getUsers = async (searchParams: SearchParamsUserType) => {

    let [sortName, order] = searchParams.sort?.split('-') || ['name', 'ASC'];

    if (sortName === 'roleDescription') {
        sortName = 'role';
    }

    const session = await getServerSession(authOptions);
    if (session?.user.role !== ROLE.ADMIN) {
        return {
            items: [],
            pages: 0

        };
    }
    const data: QueryUserType = {
        search: searchParams.q,
        role: searchParams.type,
        page: parseInt(searchParams.page || '0'),
        sort: {
            field: sortName,
            order: order as 'ASC' | 'DESC'
        }
    }
    let items = await getPagedItems(data);

    items = items.map(item => {
        return {
            ...item,
            canEdit: true,
            canDelete: true
        }
    })
    const total = await getItemsCount(data);

    return {
        items,
        pages: Math.ceil(total / 10)
    };

}

export const deleteUser = async (prevState: any, formdata: FormData) => {
    try {
        const id = formdata.get('id');

        await deleteItem(parseInt(id as string));
        revalidatePath('/users');
        return {
            message: 'success'
        };
    } catch (error) {
        return {
            message: 'Ocorreu um erro ao deletar o usuário'
        };
    }
}

export const getUser = async (id: number) => {
    if (id === 0) {
        return {
            user: {
                id: 0,
                name: '',
                email: '',
                role: ROLE.USER
            }
        };

    }
    const user = await getItem(id);
    return {
        user
    };
}

export const addOrUpdateUser = async (prevState: any, formdata: FormData) => {
    try {
        const id = formdata.get('id');

        const name = formdata.get('name');
        const email = formdata.get('email');
        const role = formdata.get('role');
        const password = formdata.get('password');
        const confirmPassword = formdata.get('passwordConfirm');


        if ((password || confirmPassword) && password !== confirmPassword) {
            return {
                message: 'As senhas não conferem'
            };
        }

        const data = {
            id: parseInt(id as string),
            name: name as string,
            email: email as string,
            role: parseInt(role as string) as ROLE
        };


        const exist = await verifyIfUserExists(data.email, data.id);


        if (exist) {
            return {
                message: 'Já existe um usuário com este email'
            };
        }
        if (data.id > 0) {
            updateItem(data, password as string);
        } else {
            addItem(data, password as string);
        }
        revalidatePath('/users');
        return {
            message: 'success'
        };
    } catch (error) {
        return {
            message: 'Ocorreu um erro ao salvar o usuário'
        };
    }
}

export const lockOrUnlockUser = async (prevState: any, formdata: FormData) => {
    try {

        const id = formdata.get('id');
        const isLocked = formdata.get('is_locked');
        await changeUserStatus(parseInt(id as string), isLocked === 'true' ? true : false)
        revalidatePath('/users');
        return {
            message: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            message: 'Ocorreu um erro ao bloquear o usuário'
        };
    }
}