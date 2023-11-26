import { ProjectType } from '@/types/project';
import { createQuery as createQuery } from '@/utils/sql.helper';
import sql from 'mssql';
import { User } from 'next-auth';
import bcrypt from 'bcrypt';
import { parseRoleToText } from '@/utils/parseRole';
import { UserType } from '@/types/user';
import { ROLE } from '@/types/role';
export type SortType = {
    field: string;
    order: 'ASC' | 'DESC';
}

export type QueryUserType = {
    search?: string;
    role?: string;
    page: number;
    sort: SortType
}

export const getPagedItems = async (data: QueryUserType): Promise<UserType[]> => {

    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();

    const queryText = createQuery(request,
        `SELECT id,name,email,role
            FROM dbo.users
    `)
        .add('name LIKE @search', 'search', data.search ? `%${data.search}%` : null, sql.VarChar)
        .add('role = @role', 'role', data.role, sql.Int)
        .orderBy(data.sort.field, data.sort.order)
        .paged(data.page, 10)
        .build();


    const result = await request.query(queryText);

    return result.recordset.map((user: User) => {
        return {
            ...user,
            roleDescription: parseRoleToText(user.role)
        };
    }) as User[];

}

export const getItemsCount = async (data: QueryUserType): Promise<number> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT count(id) as count 
            FROM dbo.users          
           
    `)
        .add('name LIKE @search', 'search', data.search ? `%${data.search}%` : null, sql.VarChar)
        .add('role = @role', 'role', data.role, sql.Int)
        .build();


    const result = await request.query(queryText);
    return result.recordset[0].count;
}

export const deleteItem = async (id: number) => {
    try {
        const pool = await sql.connect(process.env.DB_CONNECTION);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                DELETE FROM dbo.users WHERE id = @id
            `);

        true;

    } catch (error) {
        console.log({ error })
        return false;
    }
}

export const getItem = async (id: number) => {

    try {
        const pool = await sql.connect(process.env.DB_CONNECTION);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT id,name,email,role FROM dbo.users WHERE id = @id
            `);

        return result.recordset[0];

    } catch (error) {
        console.log({ error })
        return null;
    }
}

export const verifyIfUserExists = async (email: string, id: number) => {
    try {
        const pool = await sql.connect(process.env.DB_CONNECTION);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query(`
                SELECT id FROM dbo.users WHERE email = @email
            `);

        return result.recordset.length > 0 && result.recordset[0]?.id !== id;

    } catch (error) {
        console.log({ error })
        return true;
    }
}

export const addItem = async (data: User, password: string) => {
    const encryptedPassword = await bcrypt.hash(password.toString(), 10)
    const pool = await sql.connect(process.env.DB_CONNECTION);

    await pool.request().input('name', sql.VarChar, data.name)
        .input('email', sql.VarChar, data.email)
        .input('password', sql.VarChar, encryptedPassword)
        .input('role', sql.Int, data.role)
        .query`INSERT INTO dbo.users (name, email, password, role) VALUES (@name, @email,@password,@role)`
}
export const updateItem = async (data: User, password: string) => {

    const pool = await sql.connect(process.env.DB_CONNECTION);
    let query = `UPDATE dbo.users SET name = @name, email = @email, role = @role`;
    const inputs = pool.request().input('id', sql.Int, data.id)
        .input('name', sql.VarChar, data.name)
        .input('email', sql.VarChar, data.email)
        .input('role', sql.Int, data.role);
    if (password != null) {
        const encryptedPassword = await bcrypt.hash(password.toString(), 10);
        query += `, password = @password`;
        inputs.input('password', sql.VarChar, encryptedPassword);
    }
    query += ` WHERE id = @id`;
    await inputs.query(query);
}

export const getUserByRole = async (role?: ROLE) => {
    const pool = await sql.connect(process.env.DB_CONNECTION);
    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT id,name,email,role
            FROM dbo.users
    `)
        .add('role = @role', 'role', role, sql.Int)
        .build();

    const result = await request.query(queryText);
    return result.recordset.map((user: User) => user);
}