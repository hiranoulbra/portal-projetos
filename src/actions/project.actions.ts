
'use server';

import { ROLE } from '@/types/role';
import sql from 'mssql';
import { User, getServerSession } from 'next-auth';
import { z } from 'zod';
//import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'node:fs/promises';
import { deleteFiles, uploadFiles } from './files.actions';
import { ArchiveType } from '@/types/archive';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/dist/server/api-utils';
import { QueryProjectType, getItemById, getItemByIdAndUser, getItemsCount, getPagedItems } from '@/core/db/db.project';
import { validateProjectQuery } from '@/utils/validate/project/projects-query.zod';
import { revalidatePath } from 'next/cache'
import { ProjectType } from '@/types/project';
import { getProjectMembers, getProjectMembersIds } from '@/core/db/db.members';
import { getArchiveByProject } from '@/core/db/db.archive';
import { getUserByRole } from '@/core/db/db.user';
export type SearchParamsProjectType = {
    q?: string;
    s?: string;
    sd?: string;
    ed?: string;
    page?: string;
    sort?: string;
}


export const getProjects = async (searchParams: SearchParamsProjectType) => {

    let [sortName, order] = searchParams.sort?.split('-') || ['title', 'ASC'];
    const [s1, s2] = searchParams.sd?.split('_') || [undefined, undefined];
    const [e1, e2] = searchParams.ed?.split('_') || [undefined, undefined];
    const session = await getServerSession(authOptions);

    const data: QueryProjectType = {
        search: searchParams.q,
        status: searchParams.s,
        start: {
            start: s1,
            end: s2,
        },
        end: {
            start: e1,
            end: e2
        },
        page: parseInt(searchParams.page || '0'),
        sort: {
            field: sortName,
            order: order as 'ASC' | 'DESC',
        },
        userId: session?.user.id || 0,
    }
    const isAdmin = session?.user.role == ROLE.ADMIN;

    const result = validateProjectQuery(data);

    let items = await getPagedItems(data, isAdmin);

    items.map((item: ProjectType) => {
        item.canEdit = item.manager_id == session?.user.id || isAdmin;
        item.canDelete = isAdmin;
    });


    const total = await getItemsCount(data, isAdmin);

    return { items, pages: Math.ceil(total / 10) }

}


export const getEditProject = async (id: number, user?: User): Promise<ProjectType | null> => {
    console.log({ id, user })
    let project = null;
    if (!user) {
        return null;
    }
    if (id == 0) {
        return {
            status: 'Não iniciado',
            manager_id: user.id
        } as ProjectType;
    }

    try {
        project = await getItemByIdAndUser(id, user.id, user.role === ROLE.ADMIN);

        if (project == null) {
            return null;
        }
        const pool = await sql.connect(process.env.DB_CONNECTION);

        project.members_id = await getProjectMembersIds(id);

        project.archives = await getArchiveByProject(id);

    } catch (error) {
        console.log(error)
    }
    return project;
}


export const getViewProject = async (id: number): Promise<ProjectType | null> => {
    const session = await getServerSession(authOptions);
    console.log(id);
    if (!session?.user || id === 0) {
        return null;
    }
    let project = null;
    try {

        project = await getItemById(id);
        if (project == null) {
            return null;
        }
       project.members = await getProjectMembers(id);
        const userIds = project.members.map((member: any) => member.user_id);
        userIds.push(project.manager_id);
        if (userIds.indexOf(session?.user.id) == -1 && session?.user.role != ROLE.ADMIN) {
            return null;
        }
        project.archives = await getArchiveByProject(id);
    } catch (error) {
        console.log(error)
    }
    return project;
}

export const getManagers = async (): Promise<User[]> => {
    const managers = await getUserByRole(ROLE.MANAGER);
    return managers;
}

export const getUsers = async (): Promise<User[]> => {
    const users = await getUserByRole();
    return users;
}


export const submitProject = async (prevState: any, formdata: FormData) => {


    try {


        //    let d = z.number().parse();

        let files = formdata.getAll('archives') as File[];


        files = files.filter(file => file.size > 0 && file.size < 1024 * 1024);


        console.log(formdata.get('status'));

        const FormData = z.object({
            id: z.coerce.number().int(),
            title: z.string().min(3).max(50),
            description: z.string().max(500).optional(),
            manager_id: z.coerce.number().int(),
            start_date: z.coerce.date(),
            end_date: z.coerce.date(),
            planned: z.coerce.number().int().min(0).max(100),
            executed: z.coerce.number().int().min(0).max(100),
            members_id: z.array(z.coerce.number().int()).optional(),
            archives_id: z.array(z.coerce.number().int()).optional(),
            status: z.enum(['Não iniciado', 'Em andamento', 'Concluído', 'Cancelado']).optional()

        });


        const data = FormData.parse({
            id: formdata.get('id'),
            title: formdata.get('title'),
            description: formdata.get('description'),
            manager_id: formdata.get('manager_id'),
            start_date: formdata.get('start_date'),
            end_date: formdata.get('end_date'),
            planned: formdata.get('planned'),
            executed: formdata.get('executed'),
            members_id: formdata.getAll('members_id'),
            archives_id: formdata.getAll('archives_id'),
            status: formdata.get('status')
        });

        const pool = await sql.connect(process.env.DB_CONNECTION);
        if (data.id > 0) {
            const result = await pool.request()
                .input('id', sql.Int, data.id)
                .input('title', sql.VarChar, data.title)
                .input('description', sql.VarChar, data.description)
                .input('manager_id', sql.Int, data.manager_id)
                .input('start_date', sql.Date, data.start_date)
                .input('end_date', sql.Date, data.end_date)
                .input('planned', sql.Int, data.planned)
                .input('executed', sql.Int, data.executed)
                .input('status', sql.VarChar, data.status)
                .query(`
            UPDATE dbo.projects
            SET title = @title, description = @description, manager_id = @manager_id, start_date = @start_date, end_date = @end_date, planned = @planned, executed = @executed , status = @status
            WHERE id = @id
        `);

        } else {
            const result = await pool.request()
                .input('title', sql.VarChar, data.title)
                .input('description', sql.VarChar, data.description)
                .input('manager_id', sql.Int, data.manager_id)
                .input('start_date', sql.Date, data.start_date)
                .input('end_date', sql.Date, data.end_date)
                .input('planned', sql.Int, data.planned)
                .input('executed', sql.Int, data.executed)
                .input('status', sql.VarChar, data.status)
                .query(`
                    INSERT INTO dbo.projects (title, description, manager_id, start_date, end_date, planned, executed)
                    OUTPUT INSERTED.id
                    VALUES (@title, @description, @manager_id, @start_date, @end_date, @planned, @executed)
                `);

            data.id = result.recordset[0].id;

        }

        if (data?.members_id && data.members_id.filter(x => x > 0).length > 0) {

            let members_id = data.members_id.filter(x => x > 0);
            const result = await pool.request()
                .input('project_id', sql.Int, data.id)
                .input('members_id', sql.VarChar, members_id.join(','))
                .query(`
                    DELETE FROM dbo.project_members WHERE project_id = @project_id
                    INSERT INTO dbo.project_members (project_id, user_id)
                    VALUES ${members_id.map((member_id: number) => `(@project_id, ${member_id})`).join(',')}
                `);


        } else {
            const result = await pool.request()
                .input('project_id', sql.Int, data.id)
                .query(`
                DELETE FROM dbo.project_members WHERE project_id = @project_id
            `);

        }

        deleteFiles(data.id, data.archives_id || []);
        if (files.length > 0) {
            await uploadFiles(files, data.id);
        }



        return { message: 'success' };
    } catch (error) {
        console.log({ error })
        return { message: 'Erro ao adicionar o projeto' };
    }
}

export const deleteProject = async (prevState: any, formdata: FormData) => {
    const id = formdata.get('id');

    try {
        const pool = await sql.connect(process.env.DB_CONNECTION);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                DELETE FROM dbo.projects WHERE id = @id
            `);
        revalidatePath('/projects');
        return { message: 'success' };

    } catch (error) {
        console.log({ error })
        return { message: 'Erro ao deletar o projeto' };
    }
}