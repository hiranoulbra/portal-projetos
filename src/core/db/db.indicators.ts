import sql from 'mssql';
import { Indicators } from "@/types/indicators";
import { createQuery } from "@/utils/sql.helper";


export const getIndicators = async () => {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    let request = pool.request();
    const queryText = createQuery(request,
        `SELECT name,min,max,color FROM dbo.indicators`)
        .build();

    const result = await request.query(queryText);
    return result.recordset as Indicators[];

}