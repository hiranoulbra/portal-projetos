import sql from 'mssql';
import { createQuery } from "@/utils/sql.helper";
import { ArchiveType } from '@/types/archive';

export const getArchiveByProject = async (id: number): Promise<ArchiveType[]> => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        ` SELECT id, name, size,project_id
        FROM dbo.files`)
        .add('project_id = @id', 'id', id, sql.Int)
        .build();

    const result = await request.query(queryText);
    return result.recordset.map((file: ArchiveType) => file);
}

