import { DateRange } from '@/components/fields/field.date-range';
import { ProjectType } from '@/types/project';
import { endOfDay, startOfDay } from '@/utils/date.helper';
import { createQuery as createQuery } from '@/utils/sql.helper';
import dayjs from 'dayjs';
import sql, { ISqlType, query } from 'mssql';

export type SortType = {
    field: string;
    order: 'ASC' | 'DESC';
}

export type QueryProjectType = {
    search?: string;
    status?: string;
    start?: DateRange;
    end?: DateRange;
    page: number;
    sort: SortType
    userId: number;
}

export const getPagedItems = async (data: QueryProjectType, isAdmin: boolean): Promise<ProjectType[]> => {

    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();

    const queryText = createQuery(request,
        `SELECT DISTINCT p.id, p.title, p.description, u.name AS manager_name,p.manager_id, p.start_date, p.end_date,p.status
            FROM dbo.projects p
            LEFT JOIN dbo.users AS u ON p.manager_id = u.id
            LEFT JOIN dbo.project_members pm ON p.id = pm.project_id
    `)
        .add('p.title LIKE @search', 'search', data.search ? `%${data.search}%` : null, sql.VarChar)
        .add('p.status = @status', 'status', data.status, sql.VarChar)
        .add('p.start_date >= @s1', 's1', startOfDay(data?.start?.start), sql.Date)
        .add('p.start_date <= @s2', 's2', endOfDay(data?.start?.end), sql.Date)
        .add('p.end_date >= @e1', 'e1', startOfDay(data?.end?.start), sql.Date)
        .add('p.end_date <= @e2', 'e2', endOfDay(data?.end?.end), sql.Date)
        .add('(p.manager_id = @userId OR pm.user_id = @userId)', 'userId', isAdmin ? null : data.userId, sql.Int)
        .orderBy(data.sort.field, data.sort.order)
        .paged(data.page, 10)
        .build();


    const result = await request.query(queryText);

    return result.recordset.map((p) => {
        return {
            ...p,
            start_date: p.start_date ? dayjs(p.start_date).format('DD/MM/YYYY') : '',
            end_date: p.end_date ? dayjs(p.end_date).format('DD/MM/YYYY') : ''
        };
    }) as ProjectType[];

}

export const getItemsCount = async (data: QueryProjectType, isAdmin: boolean): Promise<number> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT count(DISTINCT p.id) as count 
            FROM dbo.projects p            
            LEFT JOIN dbo.project_members pm ON p.id = pm.project_id
    `)
        .add('p.title LIKE @search', 'search', data.search ? `%${data.search}%` : null, sql.VarChar)
        .add('p.status = @status', 'status', data.status, sql.VarChar)
        .add('p.start_date >= @s1', 's1', startOfDay(data?.start?.start), sql.Date)
        .add('p.start_date <= @s2', 's2', endOfDay(data?.start?.end), sql.Date)
        .add('p.end_date >= @e1', 'e1', startOfDay(data?.end?.start), sql.Date)
        .add('p.end_date <= @e2', 'e2', endOfDay(data?.end?.end), sql.Date)
        .add('(p.manager_id = @userId OR pm.user_id = @userId)', 'userId', isAdmin ? null : data.userId, sql.Int)
        .build();


    const result = await request.query(queryText);
    return result.recordset[0].count;
}

export const getItemByIdAndUser = async (id: number, userId: number, isAdmin: boolean): Promise<ProjectType | null> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        ` SELECT id, title, description,manager_id, start_date, end_date,planned, executed,status,budget
        FROM dbo.projects`)
        .add('id = @id', 'id', id, sql.Int)
        .add('manager_id = @userId', 'userId', isAdmin ? null : userId, sql.Int)
        .build();


    const result = await request.query(queryText);

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0] as ProjectType;
}

export const getItemById = async (id: number): Promise<ProjectType | null> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT p.id, p.title, p.description,p.manager_id, p.start_date, p.end_date,p.planned, p.executed, u.name as manager_name,p.status,p.budget
        FROM dbo.projects as p
        LEFT JOIN dbo.users as u ON u.id = p.manager_id`)
        .add('p.id = @id', 'id', id, sql.Int)
        .build();
    const result = await request.query(queryText);

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0] as ProjectType;
}

export const getItemsByYear = async (year: number): Promise<ProjectType[]> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT DISTINCT start_date,status,budget
            FROM dbo.projects`)
        .add('YEAR(start_date) = @year', 'year', year, sql.Int)
        .build();

    const result = await request.query(queryText);

    return result.recordset as ProjectType[];

}
export const getProjectRiskByYear = async (year: number): Promise<ProjectType[]> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT  start_date,planned,executed
            FROM dbo.projects`)
        .add('YEAR(start_date) = @year', 'year', year, sql.Int)
        .add('status = @status', 'status', 'Em andamento', sql.VarChar)
        .build();

    const result = await request.query(queryText);

    return result.recordset as ProjectType[];

}

export const getProjectYears = async (): Promise<number[]> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT DISTINCT YEAR(start_date) as year
            FROM dbo.projects`).orderBy('year', 'DESC')
        .build();

    const result = await request.query(queryText);
    return result.recordset.map((item) => item.year) as number[];

}