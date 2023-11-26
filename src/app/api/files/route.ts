import { getFile } from '@/actions/files.actions';
import { ROLE } from '@/types/role';
import { authOptions } from '@/utils/authOptions';
import sql from 'mssql';
import { getServerSession } from 'next-auth';


export async function GET(request: Request) {

    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') ?? '0');


    const pool = await sql.connect(process.env.DB_CONNECTION);
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT project_id,name FROM dbo.files WHERE id = @id');

   
    if (session?.user.role === ROLE.ADMIN) {
        const result2 = await pool.request()
            .input('id', sql.Int, result.recordset[0].project_id)
            .input('user_id', sql.Int, session?.user.id)
            .query('SELECT user_id FROM dbo.project_members WHERE project_id = @id AND user_id = @user_id');
        if (result2.recordset.length == 0) {
            return Response.json({ success: false, "message": "Você não tem permissão para acessar esse arquivo" });
        }
    }

    const readableStreamBody = await getFile(result.recordset[0].project_id, result.recordset[0].name);
    if (!readableStreamBody) {

    } else {
        return new Response(readableStreamBody as any);
    }

}