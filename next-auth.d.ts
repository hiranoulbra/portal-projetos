// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { ROLE } from "@/types/role";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
   
    
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback
     */
    interface User extends DefaultUser {
        id: number;
        name: string;
        email: string;
        phone?:string;
        role: ROLE;
        roleDescription?: string;
    }
    interface Session extends DefaultSession {
        user: User
    } 
    /**
     * The shape of the JWT returned in the `jwt` callback and passed to the `session` callback as a `token` prop
     */

}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: ROLE;
        id: number;
    }
}