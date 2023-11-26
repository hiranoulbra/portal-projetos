import sql from 'mssql';
import { createQuery } from "@/utils/sql.helper";
import { User } from 'next-auth';

export const getProjectMembersIds = async (id: number): Promise<number[]> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT user_id
            FROM dbo.project_members`)
        .add('project_id = @id', 'id', id, sql.Int)
        .build();

    const result = await request.query(queryText);

    return result.recordset.map(x => x.user_id) as number[];
}

export const getProjectMembers = async (id: number): Promise<User[]> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request, `
    SELECT pm.user_id, u.name, u.role
    FROM dbo.project_members as pm                 
    LEFT JOIN dbo.users as u ON u.id = pm.user_id`)
        .add('project_id = @id', 'id', id, sql.Int)
        .build();
    const result = await request.query(queryText);
    return result.recordset as User[];
}