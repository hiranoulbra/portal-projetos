
import sql from 'mssql';
import bcrypt from 'bcrypt';
import { User } from 'next-auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    var name = searchParams.get('name') ?? '';

    return Response.json([{ id: 1, name: 'teste', email: '' }] as User[])

}

export async function POST(request: Request) {

    const data = await request.formData();
    const password= data.get('password');

    const pool = await sql.connect(process.env.DB_CONNECTION||'');
   const result = await pool.request().input('name', sql.VarChar, data.get('name'))
    .input('email', sql.VarChar, data.get('email'))
    .query`Select * from dbo.users where email = @email`;
    
    if(result.recordset.length==0 || password==null){
        return Response.json("Usuário ou senha incorretos");
    }
    const user = result.recordset[0];
    const encryptedPassword = user.password;    
 
    const match = await bcrypt.compare(password.toString(), encryptedPassword);
  
    if(!match){
        return Response.json("Usuário ou senha incorretos");
    }
    return Response.json(result.recordset[0].email);
    //return Response.json('funfo!');
}
