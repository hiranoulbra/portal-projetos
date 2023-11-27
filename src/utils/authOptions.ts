import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import sql from 'mssql';



export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "E-mail", type: "text", placeholder: "" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
              
                
                const password = credentials?.password;
                const userName = credentials?.email;
           
                const pool = await sql.connect(process.env.DB_CONNECTION || '');

                const result = await pool.request()
                    .input('email', sql.VarChar, userName)
                    .query`Select * from dbo.users where email = @email`;

                    
              
                if (result.recordset.length == 0 || password == null) {
                    return null;
                }
                const user = result.recordset[0];
                if(user.is_blocked){
                    return null;
                }
                const encryptedPassword = user.password;
                
                const match = await bcrypt.compare(password.toString(), encryptedPassword);

           
                if (!match ) {
                    return null;
                }
        
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        })],

    callbacks: {
        jwt: async ({ token, user }) => {
            const customUser = user as User;

            if (user) {
                return { ...token, role: customUser?.role }
            }
            return token;

        },
        session: async ({ session, token }) => {
           
            if (token) {
                return {
                    ...session, user: {
                        id: parseInt(token.sub||'0'),
                        name: token.name,
                        email: token.email,
                        role: token.role
                    }
                }
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login'
    }
};
