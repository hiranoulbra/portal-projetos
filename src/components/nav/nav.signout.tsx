'use client';
import { signOut } from "next-auth/react"

interface Props {
    className?: string;
}
export const SignOutButton = ({ className }: Props) => {

    return <a onClick={() => {
        signOut({
            callbackUrl: '/auth/login'
        })
    }}
        className={`text-xs p-2 text-center font-semibold leading-none hover:bg-gray-100  hover:text-cyan-900 rounded-xl ${className ?? ''}`} href="#" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
    </a>
}