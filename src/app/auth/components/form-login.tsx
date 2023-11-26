'use client';

import { Logo } from "@/utils/icons/Logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);

    const handleLogin = async (ev: React.FormEvent) => {
        ev.preventDefault();
        try {
            setDisabled(true);
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (!response?.error) {
                router.refresh();
                router.push('/projects');
            } else {
                setError('E-mail ou senha inválidos');
            }
        } catch (error) {
            console.log('[LOGIN_ERROR]', error);
        }
        setDisabled(false);
    }
    return <div className="w-full h-screen flex items-center justify-center bg-cyan-800">
        <form onSubmit={handleLogin} className="p-10 border rounded-lg  w-96 bg-white">
           
            <div className="flex w-full justify-center mb-10">
                <Logo className="w-32 text-cyan-900" />                
            </div>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p className="text-sm text-slate-700 mb-6">Faça login para continuar.</p>
            <div className="flex flex-col">

                <div className="flex flex-col gap-1 mb-6">
                   
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="border rounded w-full p-3 border-cyan-800"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                    
                    <input
                        placeholder="Senha"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full p-3 border-cyan-800"
                    />
                </div>
               
                <button type="submit" disabled={disabled} className="mt-5 bg-cyan-800 text-slate-50 p-3 rounded disabled:bg-gray-400">Entrar</button>
                {error && <span className="text-red-400 w-full text-center block mt-2">{error}</span>}
            </div>
        </form>
    </div>
}
export { LoginForm }